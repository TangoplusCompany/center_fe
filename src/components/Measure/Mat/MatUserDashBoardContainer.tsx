import { MeasureSummary } from "@/types/measure";
import FootStatic from "./FootStatic";
import { IMatStaticPressure } from "./FootStaticContainer";

export interface MatUserDashBoardContainerProps {
  footOCP: MeasureSummary;
}



const MatUserDashBoardContainer = ({
  footOCP
}: MatUserDashBoardContainerProps) => {
  const {
    // mat_static_horizontal_ment,
    // mat_static_vertical_ment,
    // mat_static_risk_level,
    // mat_static_range_level,
    mat_static_left_top,
    mat_static_left_bottom,
    mat_static_right_top,
    mat_static_right_bottom,
    mat_static_left_pressure,
    mat_static_right_pressure,
    mat_static_top_pressure,
    mat_static_bottom_pressure,
    measure_server_mat_image_name,
    // measure_server_mat_json_name,
    // mat_hip_down_image_name,
    // mat_hip_trajectory_image_name,
    // mat_left_knee_trajectory_image_name,
    // mat_right_knee_trajectory_image_name,

  } = footOCP;
  
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

  return (
    <div className="flex flex-col">
      <FootStatic fileName={measure_server_mat_image_name} matStatics={staticFourCorners} />
    </div>
  );
};

export default MatUserDashBoardContainer;