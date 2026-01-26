"use client";

import { useMeasureInfo } from "@/hooks/api/measure/useMeasureInfo";
import { useGetQuery } from "@/hooks/utils/useGetQuery";
import React from "react";
import MeasureDetail from "./MeasureDetail";
import { useMeasureDecrypt } from "@/hooks/auth/useMeasureDecrypt";
import { Skeleton } from "../ui/skeleton";
import { formatDate } from "@/utils/formatDate";

const MeasureDetailSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Skeleton className="w-64 h-12" />
      <Skeleton className="w-full h-12" />
      <div className="flex gap-4 h-[620px]">
        <Skeleton className="w-[512px] h-full" />
        <div className="flex flex-col gap-4 w-full">
          <Skeleton className="w-full flex-1" />
          <Skeleton className="w-full flex-1" />
        </div>
      </div>
      <Skeleton className="w-full h-[300px]" />
    </div>
  );
}


const MeasureDetailContainer = () => {
  const { params } = useGetQuery();
  const { measureSn: encryptedParam } = params as { measureSn: string };
  
  const {
    data: decryptedData,
    isLoading: decryptLoading,
    isError: decryptError,
  } = useMeasureDecrypt(encryptedParam);

  const {
    data: measureData,
    isLoading: measureDataLoading,
    isError: measureDataError,
  } = useMeasureInfo({
    measure_sn: decryptedData?.measure_sn ?? 0,
    user_sn: decryptedData?.user_sn ? `${decryptedData.user_sn}` : "",
  });

  if (decryptLoading) return <MeasureDetailSkeleton />;
  if (decryptError) return <div>잘못된 접근입니다.</div>;
  if (measureDataLoading) return <MeasureDetailSkeleton />;
  if (measureDataError) return <div>Error...</div>;
  if (!measureData) return <div>No data</div>;

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-1 h-12 bg-toggleAccent rounded-full"></div>
        <h2 className="text-3xl font-semibold text-[#333] dark:text-white flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <span>{measureData.result_summary_data.user_name}님 측정 결과</span>
          <span className="text-sm text-sub300 dark:text-sub200 sm:pl-2"> {formatDate(measureData.result_summary_data.measure_date)}</span>
        </h2>
      </div>
      {measureDataLoading && (
        <MeasureDetailSkeleton />
      )}

      {measureDataError && (
        <p className="py-8 text-center text-red-500">
          측정 데이터를 불러오는 중 오류가 발생했습니다.
        </p>
      )}

      {!measureDataLoading &&
      !measureDataError && 
      measureData &&
      decryptedData &&
          (
        <MeasureDetail 
        measureData={measureData}
        measureList= { undefined }
        selectedMeasureSn= { decryptedData.measure_sn }
        userSn= {`${decryptedData.user_sn}`}
        isResultPage={false}
          />
      )}
    </div>
  );
};

export default MeasureDetailContainer;
