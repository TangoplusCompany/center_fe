import React from "react";
import { useMeasureJson } from "@/hooks/api/measure/useMeasureJson";
import DummyStaticContainer from "../DummyStaticContainer";
import { MeasurementImage } from "../MeasurementImage";
import { useMeasureSequence } from "@/hooks/api/measure/useMeasureSequence";
import RawDataContainer from "../RawDataContainer";

const MeasureStaticCompareThird = React.memo(
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
    data: measureThird,
    isLoading: seq3Loading,
    isError: seq3Error,
  } = useMeasureSequence(
    sns.measureSn,
    sns.userSn,
    2
  );
  const {
    data: measureJson,
    isLoading,
    isError,
  } = useMeasureJson(measureThird?.file_data.measure_server_json_name);

  if (!measureJson) return <DummyStaticContainer />;
  if (isLoading) return <DummyStaticContainer />;
  if (isError) return <div>에러가 발생했습니다.</div>;
  if (seq3Loading) {
    return (
      <div className="col-span-12">
        <p>로딩중...</p>
      </div>
    );
  }
  if (seq3Error) {
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
          measureThird?.file_data?.measure_server_file_name
        }
        measureJson={measureJson}
        step="first"
        cameraOrientation={cameraOrientation}
      />
      <RawDataContainer mergedDetailData={measureThird?.detail_data ?? []} isCompare={1}/>
    </div>
  );
  },
);

MeasureStaticCompareThird.displayName = "MeasureStaticThird";

export default MeasureStaticCompareThird;
