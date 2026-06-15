"use client";

import { useMeasureInfo } from "@/hooks/api/measure/useMeasureInfo";
import React, { useEffect, useState } from "react";
import { useMeasureDecrypt } from "@/hooks/auth/useMeasureDecrypt";
import { Skeleton } from "../ui/skeleton";
import { formatDate } from "@/utils/formatDate";
import MeasureDetailContainer from "./DetailContainer";
import { measureType } from "../User/Detail";
import { useSearchParams } from "next/navigation";

export const MeasureDetailSkeleton = () => {
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
export interface MeasureDetailQueryProps {
  firstMeasureType: measureType
}
const MeasureDetailQueryContainer = ({firstMeasureType}:MeasureDetailQueryProps) => {

  
  const searchParams = useSearchParams();
  const encryptedParam = searchParams.get("data") ?? "";
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

  const [measureType, setMeasureType] = useState<measureType>(firstMeasureType);
  useEffect(() => {
    if (!measureData?.measurement_meta) return;
    const { has_basic, has_rom, has_bia } = measureData.measurement_meta;
    let initialType: "basic" | "rom" | "bia" | null = null;
    
    if (has_basic === 1) {
      initialType = "basic"; // basic이 있으면 무조건 최우선
    } else if (has_rom === 1) {
      initialType = "rom";   // basic이 없고 rom이 있으면 그 다음 우선
    } else if (has_bia === 1) {
      initialType = "bia";   // bia만 남은 경우
    }

    if (initialType && !measureType) {
      setMeasureType(initialType);
    }
  }, [measureData, measureType]);
  if (decryptLoading) return <MeasureDetailSkeleton />;
  if (decryptError) return <div>잘못된 접근입니다.</div>;
  if (measureDataLoading) return <MeasureDetailSkeleton />;
  if (measureDataError) return <div>Error...</div>;
  if (!measureData) return <div>No data</div>;

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-1 h-12 bg-mainBlue-600 rounded-full"></div>
        <h2 className="text-3xl font-semibold text-[#333] dark:text-white flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <span>{measureData.measurement_meta.user_name}님 측정 결과</span>
          <span className="text-sm text-sub300 dark:text-sub200 sm:pl-2"> {formatDate(measureData.measurement_meta.measure_date)}</span>
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
        <MeasureDetailContainer 
          measureData={measureData.measurement_meta}
          measureType={measureType}
          setMeasureType={setMeasureType}
          userSn={`${decryptedData.user_sn}`}
          measureSn={decryptedData.measure_sn}
          uuid={`${decryptedData.uuid}`} 
          isMyPage={false} 
          isUserPage={false}
                      />
      )}
    </div>
  );
};

export default MeasureDetailQueryContainer;
