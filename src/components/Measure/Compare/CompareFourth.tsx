
import React, { useMemo } from "react";
import { useMeasureJson } from "@/hooks/api/measure/useMeasureJson";
import DummyStaticContainer from "../DummyStaticContainer";
import { MeasurementImage } from "../MeasurementImage";
import { useMeasureSequence } from "@/hooks/api/measure/useMeasureSequence";
import RawDataContainer from "../RawDataContainer";
import { IStaticRawDataProps } from "../RawDataResult";

const MeasureStaticCompareFourth = React.memo(
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
  const {
    data: measure0,
    isLoading: seqLoading0,
    isError: seqError0,
  } = useMeasureSequence(
    sns.measureSn0,
    sns.userSn,
    4
  );
  const {
    data: measure1,
    isLoading: seqLoading1,
    isError: seqError1,
  } = useMeasureSequence(
    sns.measureSn1,
    sns.userSn,
    4
  );
  const {
    data: measureJson0,
    isLoading: jsonLoading0,
    isError: jsonError0,
  } = useMeasureJson(measure0?.file_data.measure_server_json_name);
  const {
    data: measureJson1,
    isLoading: jsonLoading1,
    isError: jsonError1,
  } = useMeasureJson(measure1?.file_data.measure_server_json_name);
  const mergedDetailData: IStaticRawDataProps[] = useMemo(() => {
    return [
      ...(measure0?.detail_data ?? []),
      ...(measure1?.detail_data ?? []),
    ];
  }, [measure0, measure1]);
  const baseUrl = process.env.NEXT_PUBLIC_FILE_URL || '';

  const isLoading = seqLoading0 || seqLoading1 || jsonLoading0 || jsonLoading1;
  
  const isError = seqError0 || seqError1 || jsonError0 || jsonError1;
  const hasData0 = measureJson0 && measure0;
  const hasData1 = measureJson1 && measure1;
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
        {measureJson0 && measure0 && (
          <MeasurementImage
            imageUrl={
              baseUrl + "/" +
              measure0?.file_data?.measure_server_file_name
            }
            measureJson={measureJson0}
            step="first"
            cameraOrientation={cameraOrientations.orient0}
          />
        )}
      </div>
      <div className={`${className ?? ""} flex flex-col gap-4 lg:gap-10`}>
        {measureJson1 && measure1 && (
            <MeasurementImage
              imageUrl={
                baseUrl + "/" +
                measure1?.file_data?.measure_server_file_name
              }
              measureJson={measureJson1}
              step="first"
              cameraOrientation={cameraOrientations.orient1}
            />
          )}
        </div>
      </div>
      <RawDataContainer mergedDetailData={mergedDetailData} isCompare={1}/>
    </div>
  );
},
);

MeasureStaticCompareFourth.displayName = "MeasureStaticFourth";

export default MeasureStaticCompareFourth;
