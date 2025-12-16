"use client";

import { useMeasureDetail } from "@/hooks/api/measure/useMeasureDetail";
import { useGetQuery } from "@/hooks/utils/useGetQuery";
import React from "react";
import { IUserMeasurement } from "@/types/measure";
import CenterUserMeasure from "./MeasureDetail";


const MeasureDetailContainer = () => {
  const { params, query } = useGetQuery();
  const { measureSn } = params as { measureSn: string };
  const { user_uuid } = query;
  const {
    data: measureData,
    isLoading,
    isError,
  } = useMeasureDetail<IUserMeasurement>(parseInt(measureSn), user_uuid);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (!measureData) return <div>No data</div>;

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-1 h-12 bg-toggleAccent rounded-full"></div>
        <h2 className="text-3xl font-semibold text-[#333] dark:text-white">
          {measureData.measure_info.user_name}님 측정 결과
        </h2>
      </div>
      {isLoading && (
        <p className="py-8 text-center">측정내역 불러오는 중입니다...</p>
      )}

      {isError && (
        <p className="py-8 text-center text-red-500">
          측정 데이터를 불러오는 중 오류가 발생했습니다.
        </p>
      )}

      {!isLoading &&
      !isError && 
      measureData &&
          (
        <CenterUserMeasure 
        measureData={measureData}
        measureList= { undefined }
        selectedMeasureSn= { parseInt(measureSn) }
          />
      )}
    </div>
  );
};

export default MeasureDetailContainer;
