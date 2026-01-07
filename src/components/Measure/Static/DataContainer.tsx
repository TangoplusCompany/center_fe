import { IUserMeasureInfoResponse } from "@/types/measure";
import MeasureIntroUpper from "../MeasureIntroUpper";
import MeasureIntroLower from "../MeasureIntroLower";
import { riskLevelMap } from "@/utils/riskLevelMap";
import MeasureFootStatic, { IMatStaticPressure } from "../Mat/FootStatic";

const StaticDataContainer = ({
  measureData,
}:{
  measureData: IUserMeasureInfoResponse;

}) => {
  const {
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
  } = measureData.result_summary_data;
  const { 
    measure_server_mat_image_name,
    mat_static_horizontal_ment,
    mat_static_vertical_ment,
  } = measureData.static_mat_data;

  const staticFourCorners: IMatStaticPressure = {
    leftTopPressure: mat_static_left_top,
    leftBottomPressure: mat_static_left_bottom,
    rightTopPressure: mat_static_right_top,
    rightBottomPressure: mat_static_right_bottom,
    leftPressure: Math.round(mat_static_left_pressure),
    rightPressure: Math.round(mat_static_right_pressure),
    topPressure: Math.round(mat_static_top_pressure),
    bottomPressure: Math.round(mat_static_bottom_pressure),
  };

  const upperCondition = riskLevelMap[risk_upper_risk_level as 0 | 1 | 2];
  const lowerCondition = riskLevelMap[risk_lower_risk_level as 0 | 1 | 2];
  const footStaticCondition = riskLevelMap[mat_static_risk_level as 0 | 1 | 2];

  const borderCondition = {
    정상: "border-sub300/50",
    주의: "border-warning/50",
    위험: "border-danger/50",
  }[footStaticCondition] ?? "bg-primary-foreground";
  const bgCondition = {
    정상: "border-sub300/50",
    주의: "bg-gradient-to-b from-[#FFA73A]/10 from-[2%] to-white to-[40%]",
    위험: "bg-gradient-to-b from-[#FF5252]/10 from-[2%] to-white to-[50%]",
  }[footStaticCondition] ?? "bg-primary-foreground";
  // 위아래로 할 경우 flex h-full flex-col gap-4
  const leftRight = (
    <div className="grid grid-cols-2 h-full gap-4">
      <MeasureIntroUpper
        comment={risk_upper_ment}
        condition={upperCondition}
        level={risk_upper_range_level}
      />
      <MeasureIntroLower
        comment={risk_lower_ment}
        condition={lowerCondition}
        level={risk_lower_range_level}
      />
    </div>
  );


  return (
    <div className="flex flex-col gap-4">
      <div className={`rounded-2xl border-2 border-sub200 ${borderCondition} ${bgCondition}`}>
        <MeasureFootStatic
        comment={
          "[좌우 무게 분석]\n" +
          (mat_static_horizontal_ment ?? "\n") +
          "\n[상하 무게 분석]\n" +
          (mat_static_vertical_ment ?? "\n")
        }
        condition={footStaticCondition}
        level={mat_static_range_level}
        fileName={measure_server_mat_image_name}
        matStatics={staticFourCorners}
        lCase={1}
      />
      </div>
      {leftRight}
    </div>
  );
};

export default StaticDataContainer;