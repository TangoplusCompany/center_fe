import { useMeasureSequence } from "@/hooks/api/measure/useMeasureSequence";
import CompareDefault from "./CompareDefault";
import RawDataContainer from "../RawDataContainer";
import { useMeasureDynamicJson } from "@/hooks/api/measure/useMeasureDynamicJson";
import { CompareStaticProps } from "./CompareBody";
import CompareFootTrajectoryGridContainer, { CompareFootTrajectoryGridProps } from "./CompareFootTrajectoryGridContainer";
import { extractMeasureData } from "./CompareIntro";
import VideoPlayer from "./components/VideoPlayer";

const MeasureDynamicCompare = ({
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
    sequence_number: 6,
    isResultPage,

  });

  const {
    data: measure1,
    isLoading: seqLoading1,
    isError: seqError1,
  } = useMeasureSequence({
    measure_sn: rightSummaryData?.measure_sn ? String(rightSummaryData.measure_sn) : undefined,
    user_sn: String(userSn),
    sequence_number: 6,
    isResultPage,
  });
  const data0 = measure0?.file_data
  const data1 = measure1?.file_data
  const { data: measureJson0, isLoading: jsonLoading0, isError: jsonError0 } = useMeasureDynamicJson(
    data0?.measure_server_json_name
  );
  const { data: measureJson1, isLoading: jsonLoading1, isError: jsonError1 } = useMeasureDynamicJson(
    data1?.measure_server_json_name
  );
  const isRotated0 = leftSummaryData?.camera_orientation === 1;
  const isRotated1 = rightSummaryData?.camera_orientation === 1;
  console.log(isRotated0, isRotated1)
  const measureData0 = extractMeasureData(left);
  if (!measureData0) {
    return <div>데이터가 없습니다.</div>; // 또는 null, 로딩 UI 등
  }
  const measureData1 = extractMeasureData(right);
  const footData0: CompareFootTrajectoryGridProps = {
    dynamic: {
      footFileName: measureData0.mat_hip_down_image_name,
      matOhs: measureData0.ohsFourCorners,
    },
    hipFileName: measureData0.mat_hip_trajectory_image_name,
    kneeFileNames: [
      measureData0.mat_left_knee_trajectory_image_name, 
      measureData0.mat_right_knee_trajectory_image_name
    ],
    dynamicComment: `[좌우 무게 분석]\n${measureData0.mat_ohs_horizontal_ment ?? ""}\n[상하 무게 분석]\n${measureData0.mat_ohs_vertical_ment ?? ""}`,
    kneeComment: `[무릎 흔들림 분석]\n${measureData0.mat_ohs_knee_ment ?? ""}`,
    measure_date: measureData0.measure_date,
  };
  const footData1: CompareFootTrajectoryGridProps | undefined = measureData1 
  ? {
      dynamic: {
        footFileName: measureData1.mat_hip_down_image_name,
        matOhs: measureData1.ohsFourCorners,
      },
      hipFileName: measureData1.mat_hip_trajectory_image_name,
      kneeFileNames: [
        measureData1.mat_left_knee_trajectory_image_name, 
        measureData1.mat_right_knee_trajectory_image_name
      ],
      dynamicComment: `[좌우 무게 분석]\n${measureData1.mat_ohs_horizontal_ment ?? ""}\n[상하 무게 분석]\n${measureData1.mat_ohs_vertical_ment ?? ""}`,
      kneeComment: `[무릎 흔들림 분석]\n${measureData1.mat_ohs_knee_ment ?? ""}`,
      measure_date: measureData1.measure_date,
    } 
  : undefined;



  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="grid grid-cols-2 gap-2 h-full">
        {/* 좌측 비디오 플레이어 */}
        <VideoPlayer
          videoSrc={data0?.measure_server_file_name}
          isRotated={isRotated0}
          isCompare={true}
          measureJson={measureJson0}
          isLoading={seqLoading0 || jsonLoading0}
          isError={!!(seqError0 || jsonError0)}
        />

        {/* 우측 비디오 플레이어 또는 기본 화면 */}
        {data1 ? (
          <VideoPlayer
            videoSrc={data1?.measure_server_file_name}
            isRotated={isRotated1}
            isCompare={true}
            measureJson={measureJson1}
            isLoading={seqLoading1 || jsonLoading1}
            isError={!!(seqError1 || jsonError1)}
            // customCanvasTransform={isRotated1 ? undefined : "scaleX(-1.25) scaleY(1.25)"}
            // videoClassName={isRotated1 ? undefined : "-rotate-90 w-[75%] h-full object-contain"}
            // stageClassName={isRotated1 ? undefined : "relative mx-auto w-full h-[300px] sm:h-[400px] md:h-[480px] lg:h-[560px] xl:h-[680px] overflow-hidden" }
            // containerClassName={isRotated1 ? undefined: "flex flex-col gap-4 lg:gap-10"}
          />
        ) : (
          <CompareDefault onCompareDialogOpen={onCompareDialogOpen} currentSlot={1} />
        )}
      </div>

      <CompareFootTrajectoryGridContainer data0={footData0} data1={footData1} />

      <RawDataContainer 
        mergedDetailData0={measure0?.detail_data ?? []}
        mergedDetailData1={measure1?.detail_data ?? []} 
        measure_date0={leftSummaryData?.measure_date ?? ""} 
        measure_date1={rightSummaryData?.measure_date ?? ""}
        />
    </div>
  );
};

export default MeasureDynamicCompare;