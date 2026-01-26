import React from "react";
import { useMeasureJson } from "@/hooks/api/measure/useMeasureJson";
import DummyStaticContainer from "../DummyStaticContainer";
import { MeasurementImage } from "../MeasurementImage";
import { useMeasureSequence } from "@/hooks/api/measure/useMeasureSequence";
import RawDataContainer from "../RawDataContainer";
import CompareDefault from "./CompareDefault";
import { CompareStaticProps } from "./CompareBody";

const MeasureStaticCompareThird = React.memo(
({
  left,
  right,
  userSn,
  onCompareDialogOpen,
  isResultPage = false,
}: CompareStaticProps) => {
  const leftSummaryData = left?.result_summary_data
  const rightSummaryData = right?.result_summary_data
  const {
    data: measure0,
    isLoading: seqLoading0,
    isError: seqError0,
  } = useMeasureSequence({
    measure_sn: leftSummaryData?.measure_sn ? String(leftSummaryData.measure_sn) : undefined,
    user_sn: String(userSn),
    sequence_number: 2,
    isResultPage,
  });
  const {
    data: measure1,
    isLoading: seqLoading1,
    isError: seqError1,
  } = useMeasureSequence({
    measure_sn: rightSummaryData?.measure_sn ? String(rightSummaryData.measure_sn) : undefined,
    user_sn: String(userSn),
    sequence_number: 2,
    isResultPage,
  });
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
      <div className={`flex flex-col gap-4 lg:gap-10`}>
        {measureJson0 && measure0 && (
          <MeasurementImage
            imageUrl={
              baseUrl + "/" +
              measure0?.file_data?.measure_server_file_name
            }
            measureJson={measureJson0}
            step="third"
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
              step="third"
              cameraOrientation={rightSummaryData?.camera_orientation ?? 0}
              compareSlot={1}
            />
          ) : (
          <CompareDefault onCompareDialogOpen={onCompareDialogOpen} currentSlot={1}/>
        )}
        </div>
      </div>
      <RawDataContainer 
        mergedDetailData0={measure0?.detail_data ?? []}
        mergedDetailData1={measure1?.detail_data ?? []} 
        measure_date0={leftSummaryData?.measure_date ?? ""} 
        measure_date1={rightSummaryData?.measure_date ?? ""}
        />
    </div>
  );
});

MeasureStaticCompareThird.displayName = "MeasureStaticThird";

export default MeasureStaticCompareThird;
