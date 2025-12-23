import React from "react";
import DummyStaticContainer from "../DummyStaticContainer";
import { useMeasureJson } from "@/hooks/api/measure/useMeasureJson";
import { MeasurementImage } from "../MeasurementImage";
import { useMeasureSequence } from "@/hooks/api/measure/useMeasureSequence";
import RawDataContainer from "../RawDataContainer";


const MeasureStaticCompareFirst = React.memo(
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
  // TODO 정적 조회하는 api를 사용 + 하단의 useMeasureJson을 써야함 (+ Raw Data card도 넣어줘야함)
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
    data: measureJson,
    isLoading,
    isError,
  } = useMeasureJson(measureFirst?.file_data?.measure_server_json_name);

  if (!measureJson) return <DummyStaticContainer />;
  if (isLoading) return <DummyStaticContainer />;
  if (isError) return <div>에러가 발생했습니다.</div>;
  if (seq1Loading) {
    return (
      <div className="col-span-12">
        <p>로딩중...</p>
      </div>
    );
  }
  if (seq1Error) {
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
          measureFirst?.file_data?.measure_server_file_name
        }
        measureJson={measureJson}
        step="first"
        cameraOrientation={cameraOrientation}
      />
      <RawDataContainer mergedDetailData={measureFirst?.detail_data ?? []} isCompare={1}/>
    </div>
    
  );
},
);

MeasureStaticCompareFirst.displayName = "MeasureStaticFirst";

export default MeasureStaticCompareFirst;
