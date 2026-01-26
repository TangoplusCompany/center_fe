import React from "react";
import DummyStaticContainer from "../DummyStaticContainer";
import { useMeasureJson } from "@/hooks/api/measure/useMeasureJson";
import { MeasurementImage } from "../MeasurementImage";
import { useMeasureSequence } from "@/hooks/api/measure/useMeasureSequence";
import RawDataContainer from "../RawDataContainer";
import CompareDefault from "./CompareDefault";
import CompareSummaryFootStatic, { CompareSummaryFootStaticProps } from "./CompareSummaryFootStatic";
import { extractMeasureData } from "./CompareIntro";
import { CompareStaticProps } from "./CompareBody";


const MeasureStaticCompareFirst = React.memo(
({
  left,
  right,
  userSn,
  onCompareDialogOpen,
  isResultPage = false,
}: CompareStaticProps) => {
  // TODO 정적 조회하는 api를 사용 + 하단의 useMeasureJson을 써야함 (+ Raw Data card도 넣어줘야함)


  const leftSummaryData = left?.result_summary_data
  const rightSummaryData = right?.result_summary_data
  const {
    data: measure0,
    isLoading: seq1Loading0,
    isError: seq1Error0,
  } = useMeasureSequence({
    measure_sn: leftSummaryData?.measure_sn ? String(leftSummaryData.measure_sn) : undefined,
    user_sn: String(userSn),
    sequence_number: 1,
    isResultPage,
  });
  const {
    data: measure1,
    isLoading: seq1Loading1,
    isError: seq1Error1,
  } = useMeasureSequence({
    measure_sn: rightSummaryData?.measure_sn ? String(rightSummaryData.measure_sn) : undefined,
    user_sn: String(userSn),
    sequence_number: 1,
    isResultPage,
  });
  const {
    data: measureJson0,
    isLoading: isJsonLoading0,
    isError: isJsonError0,
  } = useMeasureJson(measure0?.file_data?.measure_server_json_name);
  const {
    data: measureJson1,
    isLoading: isJsonLoading1,
    isError: isJsonError1,
  } = useMeasureJson(
    measure1?.file_data?.measure_server_json_name,
  );
  const baseUrl = process.env.NEXT_PUBLIC_FILE_URL || '';


  const isLoading = seq1Loading0 || seq1Loading1 || isJsonLoading0 || isJsonLoading1;
  
  const isError = seq1Error0 || seq1Error1 || isJsonError0 || isJsonError1;
  const hasData0 = measureJson0 && measure0;
  const hasData1 = measureJson1 && measure1;
  const measureData0 = extractMeasureData(left);
  if (!measureData0) {
    return <div>데이터가 없습니다.</div>; // 또는 null, 로딩 UI 등
  }
  const measureData1 = extractMeasureData(right);

  const footStatic0 : CompareSummaryFootStaticProps = {
    comment: `[좌우 무게 분석]\n${measureData0.mat_static_horizontal_ment ?? ""}\n[상하 무게 분석]\n${measureData0.mat_static_vertical_ment ?? ""}`,
    risk_level: measureData0.mat_static_risk_level,
    range_level: measureData0.mat_static_range_level,
    fileName: measureData0.measure_server_mat_image_name,
    matStatics: measureData0.staticFourCorners,
    measure_date: measureData0.measure_date
  }

  const footStatic1 = measureData1 ? {
    comment: `[좌우 무게 분석]\n${measureData1.mat_static_horizontal_ment ?? ""}\n[상하 무게 분석]\n${measureData1.mat_static_vertical_ment ?? ""}`,
    risk_level: measureData1.mat_static_risk_level,
    range_level: measureData1.mat_static_range_level,
    fileName: measureData1.measure_server_mat_image_name,
    matStatics: measureData1.staticFourCorners,
    measure_date: measureData1.measure_date
  } : undefined;


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
        <div className={`flex flex-col gap-4 lg:gap-10`}>
          {measureJson0 && measure0 && (
            <MeasurementImage
              imageUrl={
                baseUrl + "/" +
                measure0?.file_data?.measure_server_file_name
              }
              measureJson={measureJson0}
              step="first"
              cameraOrientation={leftSummaryData?.camera_orientation ?? 0}
              compareSlot={0}
            />
          )}
        </div>
        <div className={`flex flex-col gap-4 lg:gap-10`}>
          {measureJson1 && measure1 ? (
            <MeasurementImage
              imageUrl={
                baseUrl + "/" +
                measure1?.file_data?.measure_server_file_name
              }
              measureJson={measureJson1}
              step="first"
              cameraOrientation={rightSummaryData?.camera_orientation ?? 0}
              compareSlot={1}
            />
          ) : (
            <CompareDefault onCompareDialogOpen={onCompareDialogOpen} currentSlot={1}/>
          )}
        </div>
      </div>

      <CompareSummaryFootStatic static0={footStatic0} static1={footStatic1} />
      <RawDataContainer 
        mergedDetailData0={measure0?.detail_data ?? []}
        mergedDetailData1={measure1?.detail_data ?? []} 
        measure_date0={leftSummaryData?.measure_date ?? ""} 
        measure_date1={rightSummaryData?.measure_date ?? ""}
        />

    </div>
  );
},
);

MeasureStaticCompareFirst.displayName = "MeasureStaticFirst";

export default MeasureStaticCompareFirst;

