"use client";

import { useMeasureInfo } from "@/hooks/api/measure/useMeasureInfo";
import { useGetQuery } from "@/hooks/utils/useGetQuery";
import React from "react";
import MeasureDetail from "./MeasureDetail";


const MeasureDetailContainer = () => {
  const { params, query } = useGetQuery();
  const { measureSn } = params as { measureSn: string };
  const { user_sn } = query;
  
  const {
    data: measureData,
    isLoading: measureDataLoading,
    isError: measureDataError,
  } = useMeasureInfo(
    Number(measureSn),
    `${user_sn}`
  );
  if (measureDataLoading) return <div>Loading...</div>;
  if (measureDataError) return <div>Error...</div>;
  if (!measureData) return <div>No data</div>;

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-1 h-12 bg-toggleAccent rounded-full"></div>
        <h2 className="text-3xl font-semibold text-[#333] dark:text-white">
          {measureData.result_summary_data.user_name}님 측정 결과
        </h2>
      </div>
      {measureDataLoading && (
        <p className="py-8 text-center">측정내역 불러오는 중입니다...</p>
      )}

      {measureDataError && (
        <p className="py-8 text-center text-red-500">
          측정 데이터를 불러오는 중 오류가 발생했습니다.
        </p>
      )}

      {!measureDataLoading &&
      !measureDataError && 
      measureData &&
          (
        <MeasureDetail 
        measureData={measureData}
        measureList= { undefined }
        selectedMeasureSn= { parseInt(measureSn) }
        userSn = {user_sn}
          />
      )}
    </div>
  );
};

export default MeasureDetailContainer;
