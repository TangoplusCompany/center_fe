
import React, { useMemo } from "react";
import MeasureStaticFirst from "./First";
import MeasureStaticSecond from "./Second";
import { IStaticRawDataProps } from "../RawDataResult";
import { useMeasureSequence } from "@/hooks/api/measure/useMeasureSequence";
import RawDataContainer from "../RawDataContainer";

const FrontMeasurement = ({
  sns,
  cameraOrientation
}: {
  sns: {
    measureSn: string;
    userSn: string;
  };
  cameraOrientation: 0 | 1;
}) => {

    const {
      data: measureFirst,
      isLoading: seq1Loading,
      isError: seq1Error,
    } = useMeasureSequence(
      sns.measureSn,
      sns.userSn,
      1
    );
    const {
      data: measureSecond,
      isLoading: seq2Loading,
      isError: seq2Error,
    } = useMeasureSequence(
      sns.measureSn,
      sns.userSn,
      5
    );
    const mergedDetailData: IStaticRawDataProps[] = useMemo(() => {
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
      <div className="grid grid-cols-2">
        <div className="col-span-1">
          <MeasureStaticFirst files={measureFirst?.file_data} cameraOrientation={cameraOrientation} />
        </div>
        <div className="col-span-1">
          <MeasureStaticSecond files={measureSecond?.file_data} cameraOrientation={cameraOrientation} />
        </div>
      </div>
      {/* TODO 이 곳에 족압 이미지를 넣는 컴포넌트가 필요함. */}
      {/* 하단: RawDataResult*/}
      <RawDataContainer mergedDetailData={mergedDetailData} isCompare={0}/>
    </div>
  );
};

export default FrontMeasurement;
