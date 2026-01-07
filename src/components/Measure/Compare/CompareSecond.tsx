import React, { useMemo } from "react";
import { useMeasureJson } from "@/hooks/api/measure/useMeasureJson";
import DummyStaticContainer from "../DummyStaticContainer";
import { MeasurementImage } from "../MeasurementImage";
import { useMeasureSequence } from "@/hooks/api/measure/useMeasureSequence";
import RawDataContainer from "../RawDataContainer";
import { IStaticRawDataProps } from "../RawDataResult";

const MeasureStaticCompareSecond = React.memo(
  ({
    className,
    sns,
    cameraOrientation
  }: {
    className?: string;
    sns: {
    measureSn0?: string;
    measureSn1?: string;
      userSn: string;
    };
    cameraOrientation: 0 | 1;
  }) => {
    const {
      data: measureSecond0,
      isLoading: seq2Loading0,
      isError: seq2Error0,
    } = useMeasureSequence(
      sns.measureSn0,
      sns.userSn,
      5
    );
    const {
      data: measureSecond1,
      isLoading: seq2Loading1,
      isError: seq2Error1,
    } = useMeasureSequence(
      sns.measureSn1,
      sns.userSn,
      5
    );
    const {
      data: measureJson0,
      isLoading: isJsonLoading0,
      isError: isJsonError0,
    } = useMeasureJson(measureSecond0?.file_data?.measure_server_json_name);
    const {
      data: measureJson1,
      isLoading: isJsonLoading1,
      isError: isJsonError1,
    } = useMeasureJson(measureSecond1?.file_data?.measure_server_json_name);

    const mergedDetailData: IStaticRawDataProps[] = useMemo(() => {
      return [
        ...(measureSecond0?.detail_data ?? []),
        ...(measureSecond1?.detail_data ?? []),
      ];
    }, [measureSecond0, measureSecond1]);
    const baseUrl = process.env.NEXT_PUBLIC_FILE_URL || '';


    const isLoading = seq2Loading0 || seq2Loading1 || isJsonLoading0 || isJsonLoading1;
    
    const isError = seq2Error0 || seq2Error1 || isJsonError0 || isJsonError1;
    const hasData0 = measureJson0 && measureSecond0;
    const hasData1 = measureJson1 && measureSecond1;
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
            {measureJson0 && measureSecond0 && (
              <MeasurementImage
                imageUrl={
                  baseUrl + "/" +
                  measureSecond0?.file_data?.measure_server_file_name
                }
                measureJson={measureJson0}
                step="first"
                cameraOrientation={cameraOrientation}
              />
            )}
          </div>
          <div className={`${className ?? ""} flex flex-col gap-4 lg:gap-10`}>
            {measureJson1 && measureSecond1 && (
                <MeasurementImage
                  imageUrl={
                    baseUrl + "/" +
                    measureSecond1?.file_data?.measure_server_file_name
                  }
                  measureJson={measureJson1}
                  step="first"
                  cameraOrientation={cameraOrientation}
                />
              )}
            </div>
        </div>
      <RawDataContainer mergedDetailData={mergedDetailData} isCompare={1}/>

      </div>
    );
  },
);

MeasureStaticCompareSecond.displayName = "MeasureStaticSecond";

export default MeasureStaticCompareSecond;
