
import React, { useMemo } from "react";
import MeasureStaticFirst from "./First";
import MeasureStaticSecond from "./Second";
import { useMeasureSequence } from "@/hooks/api/measure/useMeasureSequence";
import RawDataContainer from "../RawDataContainer";
import StaticDataContainer from "./DataContainer";
import { IUserMeasureDetailData, IUserMeasureInfoResponse } from "@/types/measure";

const FrontMeasurement = ({
  sns,
  measureInfo,
  cameraOrientation,
  isResultPage = false,
}: {
  sns: {
    measureSn: string;
    userSn: string;

  };
  measureInfo: IUserMeasureInfoResponse;
  cameraOrientation: 0 | 1;
  isResultPage: boolean;
}) => {

  const {
    data: measureFirst,
    isLoading: seq1Loading,
    isError: seq1Error,
  } = useMeasureSequence({
    measure_sn: sns.measureSn,
    user_sn: sns.userSn,
    sequence_number: 1,
    isResultPage,
  });
  const {
    data: measureSecond,
    isLoading: seq2Loading,
    isError: seq2Error,
  } = useMeasureSequence({
    measure_sn: sns.measureSn,
    user_sn: sns.userSn,
    sequence_number: 5,
    isResultPage,
  });
  const mergedDetailData: IUserMeasureDetailData[] = useMemo(() => {
    return [
      ...(measureFirst?.detail_data ?? []),
      ...(measureSecond?.detail_data ?? []),
    ];
  }, [measureFirst, measureSecond]);

  if (seq1Loading || seq2Loading) {
    return (
      <div className="col-span-12">
        <p>로딩중...</p>
      </div>
    );
  }
  if (seq1Error || seq2Error) {
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
          <MeasureStaticFirst files={measureFirst?.file_data} cameraOrientation={cameraOrientation} />
        </div>
        <div className="col-span-1">
          <MeasureStaticSecond files={measureSecond?.file_data} cameraOrientation={cameraOrientation} />
        </div>
      </div>
      {/* TODO 이 곳에 족압 이미지를 넣는 컴포넌트가 필요함. */}
      {/* 하단: RawDataResult*/}
      <StaticDataContainer measureData={measureInfo} />
      <RawDataContainer mergedDetailData0={mergedDetailData} measure_date0={""} measure_date1={""} />
    </div>
  );
};

export default FrontMeasurement;
