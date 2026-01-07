import { IUserMeasureDetailData, IUserMeasureDynamicFileData, IUserMeasureInfoResponse } from "@/types/measure";
import FootDynamic, { IMatOhsPressure } from "../Mat/FootDynamic";
import MeasureKneeTrajectory from "../Mat/KneeTrajectory";
import RawDataContainer from "../RawDataContainer";
import MeasureIntroUpper from "../MeasureIntroUpper";
import MeasureIntroLower from "../MeasureIntroLower";
import { riskLevelMap } from "@/utils/riskLevelMap";

const DynamicDataContainer = (
  {
    fileData,
    detailData,
    measureInfo,
    isCompare,
  }:{
    fileData: IUserMeasureDynamicFileData;
    detailData?: IUserMeasureDetailData[];
    measureInfo: IUserMeasureInfoResponse;
    isCompare: 0 | 1 ; // isCompare==0 이면 compare임. 
  }
) => {
    const {
    mat_hip_down_image_name,
    mat_hip_trajectory_image_name,
    mat_left_knee_trajectory_image_name,
    mat_right_knee_trajectory_image_name,
    mat_ohs_left_top,
    mat_ohs_left_bottom,
    mat_ohs_right_top,
    mat_ohs_right_bottom,
    mat_ohs_left_pressure,
    mat_ohs_right_pressure,
    mat_ohs_top_pressure,
    mat_ohs_bottom_pressure,
    mat_ohs_horizontal_ment,
    mat_ohs_vertical_ment,
    mat_ohs_knee_ment,
    // measure_server_file_name,
    // measure_server_json_name,
  } = fileData

    const ohsFourCorners: IMatOhsPressure = {
    leftTopPressure: mat_ohs_left_top,
    leftBottomPressure: mat_ohs_left_bottom,
    rightTopPressure: mat_ohs_right_top,
    rightBottomPressure: mat_ohs_right_bottom,
    leftPressure: Math.round(mat_ohs_left_pressure),
    rightPressure: Math.round(mat_ohs_right_pressure),
    topPressure: Math.round(mat_ohs_top_pressure),
    bottomPressure: Math.round(mat_ohs_bottom_pressure),
  };

  const {
    risk_upper_ment,
    risk_upper_risk_level,
    risk_upper_range_level,
    risk_lower_ment,
    risk_lower_risk_level,
    risk_lower_range_level,
  } = measureInfo.result_summary_data;
  const upperCondition = riskLevelMap[risk_upper_risk_level as 0 | 1 | 2];
  const lowerCondition = riskLevelMap[risk_lower_risk_level as 0 | 1 | 2];
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
      <div className="flex border border-sub300 rounded-3xl">
        <div className="flex-1 p-4">
          <FootDynamic
            comment={
              "[좌우 무게 분석]\n" +
              (mat_ohs_horizontal_ment ?? "\n") +
              "\n[상하 무게 분석]\n" +
              (mat_ohs_vertical_ment ?? "\n")
            }
            footFileName={mat_hip_down_image_name}
            hipFileName={mat_hip_trajectory_image_name}
            matOhs={ohsFourCorners}
            lCase={isCompare} // TODO lcase에 들어가는 값이 아구가 맞는지 확인 후, 비교 후 컨테이너 만들어서 넣기 
          />
        </div>
        <div className="flex-1 p-4">
          <MeasureKneeTrajectory
            comment={"무릎 흔들림 분석\n" + (mat_ohs_knee_ment ?? "")}
            leftKneeFileName={mat_left_knee_trajectory_image_name}
            rightKneeFileName={mat_right_knee_trajectory_image_name}
          />
        </div>
      </div>
      {leftRight}
      <RawDataContainer mergedDetailData={detailData ?? []} isCompare={isCompare}/>
    </div>
  );
}

export default DynamicDataContainer;