import { CompareSlot } from "@/types/compare";
import { IUserMeasureInfoResponse } from "@/types/measure";
import CompareSummaryUnit from "./CompareSummaryUnit";
import CompareFootTrajectoryGridContainer, { CompareFootTrajectoryGridProps } from "./CompareFootTrajectoryGridContainer";
import SkeletonBox from "../SkeletonBox";
import CompareDefault from "./CompareDefault";
import CompareSummaryFootStatic, { CompareSummaryFootStaticProps } from "./CompareSummaryFootStatic";

const CompareIntro = ({
  data0,
  data1,
  onCompareDialogOpen,

}:{
  data0?: IUserMeasureInfoResponse;
  data1?: IUserMeasureInfoResponse;
  onCompareDialogOpen? : (slot: CompareSlot) => void;
  currentSlot?: CompareSlot;
}) => {

  const extractMeasureData = (data: IUserMeasureInfoResponse  | undefined) => {
    if (!data?.result_summary_data) {
      return undefined;
    }

    const {
      measure_date,
      risk_upper_ment,
      risk_upper_risk_level,
      risk_upper_range_level,
      risk_lower_ment,
      risk_lower_risk_level,
      risk_lower_range_level,
      mat_static_risk_level,
      mat_static_range_level,
      mat_static_left_top,
      mat_static_left_bottom,
      mat_static_right_top,
      mat_static_right_bottom,
      mat_static_left_pressure,
      mat_static_right_pressure,
      mat_static_top_pressure,
      mat_static_bottom_pressure,
      mat_ohs_left_top,
      mat_ohs_left_bottom,
      mat_ohs_right_top,
      mat_ohs_right_bottom,
      mat_ohs_left_pressure,
      mat_ohs_right_pressure,
      mat_ohs_top_pressure,
      mat_ohs_bottom_pressure,
    } = data.result_summary_data;

    const { 
      measure_server_mat_image_name,
      mat_static_horizontal_ment,
      mat_static_vertical_ment,
    } = data.static_mat_data;

    const {
      mat_hip_down_image_name,
      mat_hip_trajectory_image_name,
      mat_left_knee_trajectory_image_name,
      mat_right_knee_trajectory_image_name,
      mat_ohs_horizontal_ment,
      mat_ohs_vertical_ment,
      mat_ohs_knee_ment,
    } = data.dynamic_mat_data;

    
    const staticFourCorners = {
      leftTopPressure: mat_static_left_top,
      leftBottomPressure: mat_static_left_bottom,
      rightTopPressure: mat_static_right_top,
      rightBottomPressure: mat_static_right_bottom,
      leftPressure: Math.round(mat_static_left_pressure),
      rightPressure: Math.round(mat_static_right_pressure),
      topPressure: Math.round(mat_static_top_pressure),
      bottomPressure: Math.round(mat_static_bottom_pressure),
    };

    const ohsFourCorners = {
      leftTopPressure: mat_ohs_left_top,
      leftBottomPressure: mat_ohs_left_bottom,
      rightTopPressure: mat_ohs_right_top,
      rightBottomPressure: mat_ohs_right_bottom,
      leftPressure: Math.round(mat_ohs_left_pressure),
      rightPressure: Math.round(mat_ohs_right_pressure),
      topPressure: Math.round(mat_ohs_top_pressure),
      bottomPressure: Math.round(mat_ohs_bottom_pressure),
    };

    return {
      measure_date,
      mat_static_risk_level,
      mat_static_range_level,
      measure_server_mat_image_name,
      mat_static_horizontal_ment,
      mat_static_vertical_ment,
      mat_hip_down_image_name,
      mat_hip_trajectory_image_name,
      mat_left_knee_trajectory_image_name,
      mat_right_knee_trajectory_image_name,
      mat_ohs_horizontal_ment,
      mat_ohs_vertical_ment,
      mat_ohs_knee_ment,
      staticFourCorners,
      ohsFourCorners,
      // 상하지 데이터도 함께 반환
      upper: {
        ment: risk_upper_ment,
        risk_level: risk_upper_risk_level.toString(),
        range_level: risk_upper_range_level.toString(),
        measure_date: measure_date
      },
      lower: {
        ment: risk_lower_ment,
        risk_level: risk_lower_risk_level.toString(),
        range_level: risk_lower_range_level.toString(),
        measure_date: measure_date
      },
    };
  };
  const measureData0 = extractMeasureData(data0);
  if (!measureData0) {
    return <div>데이터가 없습니다.</div>; // 또는 null, 로딩 UI 등
  }
  const measureData1 = extractMeasureData(data1);

  const skeletonBoxes = (
    <div className="grid grid-cols-2 gap-4">
      {data0?.result_summary_data ? 
      <SkeletonBox data={data0.result_summary_data} /> : 
      <CompareDefault onCompareDialogOpen={onCompareDialogOpen} 
      currentSlot={0}
      />}
      {data1?.result_summary_data ? 
      <SkeletonBox data={data1.result_summary_data} /> : 
      <CompareDefault onCompareDialogOpen={onCompareDialogOpen} 
      currentSlot={1}
      />
      }
    </div>
  )
  const summaryUnits = (
    <div className="flex-1 h-full gap-4">
      <CompareSummaryUnit summaryUnit0={measureData0.upper} summaryUnit1={measureData1?.upper} title={"상지요약"} />
      <CompareSummaryUnit summaryUnit0={measureData0.lower} summaryUnit1={measureData1?.lower} title={"하지요약"} />
    </div>
  );

  // 정적 족압 
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


  // 족압 및 궤적 이미지 4개
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
    <div className="flex flex-col">
      {skeletonBoxes}
      <div className="h-4"></div>
      {summaryUnits}
      {<CompareSummaryFootStatic static0={footStatic0} static1={footStatic1} />}
      <CompareFootTrajectoryGridContainer data0={footData0} data1={footData1} />
    </div>
  );
};

export default CompareIntro;