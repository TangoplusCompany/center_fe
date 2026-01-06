
import React, { useMemo } from "react";
import MeasureStaticFifth from "./Fifth";
import MeasureStaticSixth from "./Sixth";
import { IStaticRawDataProps } from "../RawDataResult";
import { useMeasureSequence } from "@/hooks/api/measure/useMeasureSequence";
import RawDataContainer from "../RawDataContainer";
import StaticDataContainer from "./DataContainer";
import { IUserMeasureInfoResponse } from "@/types/measure";

const BackMeasurement = ({
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
    data: measureFifth,
    isLoading: seq5Loading,
    isError: seq5Error,
  } = useMeasureSequence(
    sns.measureSn,
    sns.userSn,
    3
  );
  const {
    data: measureSixth,
    isLoading: seq6Loading,
    isError: seq6Error,
  } = useMeasureSequence(
    sns.measureSn,
    sns.userSn,
    7
  );
  const mergedDetailData: IStaticRawDataProps[] = useMemo(() => {
    return [
      ...(measureFifth?.detail_data ?? []),
      ...(measureSixth?.detail_data ?? []),
    ];
  }, [measureFifth, measureSixth]);

if (seq5Loading || seq6Loading) {
  return (
    <div className="col-span-12">
      <p>로딩중...</p>
    </div>
  );
}
if (seq5Error || seq6Error) {
  return (
    <div className="col-span-12">
      <p>오류가 발생했습니다</p>
    </div>
  );
}

  return (
        <div className="flex flex-col gap-5">
      {/* 상단: 이미지 2개 */}
      <div className="grid grid-cols-2">
        <div className="col-span-1">
          <MeasureStaticFifth files={measureFifth?.file_data} cameraOrientation={cameraOrientation} />
        </div>
        <div className="col-span-1">
          <MeasureStaticSixth files={measureSixth?.file_data} cameraOrientation={cameraOrientation} />
        </div>
      </div>
      <StaticDataContainer measureData={measureInfo} />
      <RawDataContainer mergedDetailData={mergedDetailData} isCompare={0}/>
    </div>
  );
};

export default BackMeasurement;
