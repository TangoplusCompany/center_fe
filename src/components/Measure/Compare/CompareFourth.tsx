
import React from "react";
import { useMeasureJson } from "@/hooks/api/measure/useMeasureJson";
import DummyStaticContainer from "../DummyStaticContainer";
import { MeasurementImage } from "../MeasurementImage";
import { useMeasureSequence } from "@/hooks/api/measure/useMeasureSequence";
import RawDataContainer from "../RawDataContainer";

const MeasureStaticCompareFourth = React.memo(
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
    data: measureFourth,
    isLoading: seq4Loading,
    isError: seq4Error,
  } = useMeasureSequence(
    sns.measureSn,
    sns.userSn,
    4
  );
  const {
    data: measureJson,
    isLoading,
    isError,
  } = useMeasureJson(measureFourth?.file_data.measure_server_json_name);

  if (!measureJson) return <DummyStaticContainer />;
  if (isLoading) return <DummyStaticContainer />;
  if (isError) return <div>에러가 발생했습니다.</div>;
  if (seq4Loading) {
    return (
      <div className="col-span-12">
        <p>로딩중...</p>
      </div>
    );
  }
  if (seq4Error) {
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
          measureFourth?.file_data?.measure_server_file_name
        }
        measureJson={measureJson}
        step="first"
        cameraOrientation={cameraOrientation}
      />
      <RawDataContainer mergedDetailData={measureFourth?.detail_data ?? []} isCompare={1}/>
    </div>
  );
},
);

MeasureStaticCompareFourth.displayName = "MeasureStaticFourth";

export default MeasureStaticCompareFourth;
