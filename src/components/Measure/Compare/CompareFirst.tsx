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
  cameraOrientations
}: {
  className?: string;
  sns: {
    measureSn0?: string;
    measureSn1?: string;
    userSn: string;
  };
  cameraOrientations: {
    orient0 :0 | 1;
    orient1 : 0 | 1;
  };
}) => {
  // TODO 정적 조회하는 api를 사용 + 하단의 useMeasureJson을 써야함 (+ Raw Data card도 넣어줘야함)
  const {
    data: measureFirst0,
    isLoading: seq1Loading0,
    isError: seq1Error0,
  } = useMeasureSequence(
    sns.measureSn0,
    sns.userSn,
    1
  );
  const {
    data: measureFirst1,
    isLoading: seq1Loading1,
    isError: seq1Error1,
  } = useMeasureSequence(
    sns.measureSn1,
    sns.userSn,
    1
  );
  const {
    data: measureJson0,
    isLoading: isJsonLoading0,
    isError: isJsonError0,
  } = useMeasureJson(measureFirst0?.file_data?.measure_server_json_name);
  const {
    data: measureJson1,
    isLoading: isJsonLoading1,
    isError: isJsonError1,
  } = useMeasureJson(measureFirst1?.file_data?.measure_server_json_name);
  const baseUrl = process.env.NEXT_PUBLIC_FILE_URL || '';


  const isLoading = seq1Loading0 || seq1Loading1 || isJsonLoading0 || isJsonLoading1;
  
  const isError = seq1Error0 || seq1Error1 || isJsonError0 || isJsonError1;
  const hasData0 = measureJson0 && measureFirst0;
  const hasData1 = measureJson1 && measureFirst1;
  if (isLoading) {
    return <DummyStaticContainer />;
  }
  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }
  if (!hasData0 && !hasData1) {
    return <DummyStaticContainer />;
  }
  
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
      <div className={`${className ?? ""} flex flex-col gap-4 lg:gap-10`}>
        {measureJson0 && measureFirst0 && (
          <MeasurementImage
            imageUrl={
              baseUrl + "/" +
              measureFirst0?.file_data?.measure_server_file_name
            }
            measureJson={measureJson0}
            step="first"
            cameraOrientation={cameraOrientations.orient0}
          />
        )}
      </div>
      <div className={`${className ?? ""} flex flex-col gap-4 lg:gap-10`}>
        {measureJson1 && measureFirst1 && (
          <MeasurementImage
            imageUrl={
              baseUrl + "/" +
              measureFirst1?.file_data?.measure_server_file_name
            }
            measureJson={measureJson1}
            step="first"
            cameraOrientation={cameraOrientations.orient1}
          />
        )}
      </div>
    </div>
    <RawDataContainer mergedDetailData0={measureFirst0?.detail_data ?? []} mergedDetailData1={measureFirst1?.detail_data ?? []}/>

    </div>
  );
},
);

MeasureStaticCompareFirst.displayName = "MeasureStaticFirst";

export default MeasureStaticCompareFirst;
