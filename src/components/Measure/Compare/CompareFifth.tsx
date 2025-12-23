import React from "react";
import DummyStaticContainer from "../DummyStaticContainer";
import { useMeasureJson } from "@/hooks/api/measure/useMeasureJson";
import { MeasurementImage } from "../MeasurementImage";
import { useMeasureSequence } from "@/hooks/api/measure/useMeasureSequence";
import RawDataContainer from "../RawDataContainer";

const MeasureStaticCompareFifth  = React.memo(
({
  className,
  sns,
  cameraOrientation
}: {
  className?: string;
  sns: {
    measureSn: string;
    userSn: string;
  };
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
    data: measureJson,
    isLoading,
    isError,
  } = useMeasureJson(measureFifth?.file_data.measure_server_json_name);

  if (!measureJson) return <DummyStaticContainer />;
  if (isLoading) return <DummyStaticContainer />;
  if (isError) return <div>에러가 발생했습니다.</div>;
  if (seq5Loading) {
    return (
      <div className="col-span-12">
        <p>로딩중...</p>
      </div>
    );
  }
  if (seq5Error) {
    return (
      <div className="col-span-12">
        <p>오류가 발생했습니다</p>
      </div>
    );
  }
  return (
    <div className={`${className ?? ""} flex flex-col gap-4 lg:gap-10`}>
      <MeasurementImage
        imageUrl={
          `https://gym.tangoplus.co.kr/data/Results/` +
          measureFifth?.file_data?.measure_server_file_name
        }
        measureJson={measureJson}
        step="first"
        cameraOrientation={cameraOrientation}
      />
      <RawDataContainer mergedDetailData={measureFifth?.detail_data ?? []} isCompare={1}/>
    </div>
  );
},
);

MeasureStaticCompareFifth.displayName = "MeasureStaticFifth";

export default MeasureStaticCompareFifth;
