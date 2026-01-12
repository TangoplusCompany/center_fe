import { IUserMeasureDetailData, IUserMeasureDynamicFileData } from "@/types/measure";
import FootDynamic, { IMatOhsPressure } from "../Mat/FootDynamicContainer";
import MeasureKneeTrajectory from "../Mat/KneeTrajectoryContainer";
import RawDataContainer from "../RawDataContainer";

const DynamicDataContainer = (
  {
    fileData,
    detailData,
    isCompare,
  }:{
    fileData: IUserMeasureDynamicFileData;
    detailData?: IUserMeasureDetailData[];
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
      <RawDataContainer mergedDetailData0={detailData ?? []} />
    </div>
  );
}

export default DynamicDataContainer;