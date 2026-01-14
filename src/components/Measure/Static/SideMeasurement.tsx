import React, { useMemo } from "react";
import MeasureStaticThird from "./Third";
import MeasureStaticFourth from "./Fourth";

import { useMeasureSequence } from "@/hooks/api/measure/useMeasureSequence";
import RawDataContainer from "../RawDataContainer";
import { IUserMeasureDetailData, IUserMeasureInfoResponse } from "@/types/measure";
import StaticDataContainer from "./DataContainer";

const SideMeasurement = ({
  sns,
  measureInfo,
  cameraOrientation
}: {
  sns: {
    measureSn: string;
    userSn: string;
  };
  measureInfo: IUserMeasureInfoResponse;
  cameraOrientation: 0 | 1;
}) => {
  const {
        data: measureThird,
        isLoading: seq3Loading,
        isError: seq3Error,
      } = useMeasureSequence(
        sns.measureSn,
        sns.userSn,
        2
      );
      const {
        data: measureFourth,
        isLoading: seq4Loading,
        isError: seq4Error,
      } = useMeasureSequence(
        sns.measureSn,
        sns.userSn,
        4
      );
      const mergedDetailData: IUserMeasureDetailData[] = useMemo(() => {
        return [
          ...(measureThird?.detail_data ?? []),
          ...(measureFourth?.detail_data ?? []),
        ];
      }, [measureThird, measureFourth]);
  
    if (seq3Loading || seq4Loading) {
      return (
        <div className="col-span-12">
          <p>로딩중...</p>
        </div>
      );
    }
    if (seq3Error || seq4Error) {
      return (
        <div className="col-span-12">
          <p>오류가 발생했습니다</p>
        </div>
      );
    }
    
  return (
    <div className="flex flex-col gap-5">
      {/* 상단: 이미지 2개 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <MeasureStaticThird files={measureThird?.file_data} cameraOrientation={cameraOrientation} />
        </div>
        <div className="col-span-1">
          <MeasureStaticFourth files={measureFourth?.file_data} cameraOrientation={cameraOrientation} />
        </div>
      </div>
      <StaticDataContainer measureData={measureInfo} />
      <RawDataContainer mergedDetailData0={mergedDetailData} measure_date0={""} measure_date1={""} />
    </div>
  );
};

export default SideMeasurement;
