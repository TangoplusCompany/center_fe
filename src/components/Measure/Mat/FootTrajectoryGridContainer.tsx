import { MeasureSummary } from "@/types/measure";
import FootStatic from "./FootStatic";
import FootDynamic from "./FootDynamic";
import HipTrajectory from "./HipTrajectory";
import KneeTrajectory from "./KneeTrajectory";
import { IMatStaticPressure } from "./FootStaticContainer";
import { IMatOhsPressure } from "./FootDynamicContainer";

const FootTrajectoryGridContainer = ({
  footOCP
}:{
  footOCP: MeasureSummary;
}
) => {
  const {
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
    measure_server_mat_image_name,
    // measure_server_mat_json_name,
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
  const getRiskString = (level?: number) => 
  ({
    0: "정상",
    1: "주의",
    2: "위험"
  } as const)[level ?? "0"] ?? "정상";
  const getRiskText = (level?: string) => ({
    정상: "text-sub600",
    주의: "text-white",
    위험: "text-white",
  } as const)[level as "정상" | "주의" | "위험"] ?? "bg-primary-foreground";
  const getRiskBgClass = (level?: string) =>
  ({
    정상: "bg-sub200/50",
    주의: "bg-warning",
    위험: "bg-danger",
  } as const)[level as "정상" | "주의" | "위험"] ?? "bg-primary-foreground";
  const riskString = getRiskString(mat_static_risk_level);
  const riskBg = getRiskBgClass(riskString);
  const riskText = getRiskText(riskString)
  
  return (
    <div className="flex flex-col gap-2">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 h-full relative">
        {/* 왼쪽: FootStatic */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center py-2">
            <h2 className="text-xl font-semibold">정적 족압 결과</h2>
            <span className={`px-3 py-1 ${riskBg} rounded-xl text-sm ${riskText}`}>
              {riskString} {mat_static_range_level}단계
            </span>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full max-w-xs aspect-square">
              <FootStatic fileName={measure_server_mat_image_name} matStatics={staticFourCorners} />
            </div>
          </div>
        </div>

        {/* 세로 구분선 - 데스크탑에만 표시 */}
        <div className="hidden lg:block absolute top-2 bottom-2 left-1/2 w-0.5 bg-sub200 -translate-x-1/2" />

        {/* 오른쪽: 반응형 그리드 - 모바일: 2x2, 태블릿: 4x1, 데스크톱: 2x2 */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 lg:grid-rows-2 gap-4">
          {/* FootDynamic */}
          <div className="col-span-1 lg:row-span-1 flex items-center justify-center">
            <div className="flex flex-col items-center w-full max-w-[200px] lg:max-w-none">
              <div className="w-full rounded-md border text-center py-1 mb-1 text-xs sm:text-sm">
                동적 족압 분석
              </div>
              <div className="w-full aspect-square max-w-[200px] lg:max-w-none mx-auto">
                <FootDynamic footFileName={mat_hip_down_image_name} matOhs={ohsFourCorners} />
              </div>
            </div>
          </div>
          
          {/* HipTrajectory */}
          <div className="col-span-1 lg:row-span-1 flex items-center justify-center">
            <div className="flex flex-col items-center w-full max-w-[200px] lg:max-w-none">
              <div className="w-full rounded-md border text-center py-1 mb-1 text-xs sm:text-sm">
                골반 이동 분석
              </div>
              <div className="w-full aspect-square max-w-[200px] lg:max-w-none mx-auto">
                <HipTrajectory hipFileName={mat_hip_trajectory_image_name} />
              </div>
            </div>
          </div>
          
          {/* Left KneeTrajectory */}
          <div className="col-span-1 lg:row-span-1 flex items-center justify-center">
            <div className="flex flex-col items-center w-full max-w-[200px] lg:max-w-none">
              <div className="w-full rounded-md border text-center py-1 mb-1 text-xs sm:text-sm">
                무릎이동 궤적(L)
              </div>
              <div className="w-full aspect-square max-w-[200px] lg:max-w-none mx-auto">
                <KneeTrajectory kneeFileName={mat_left_knee_trajectory_image_name} />
              </div>
            </div>
          </div>
          
          {/* Right KneeTrajectory */}
          <div className="col-span-1 lg:row-span-1 flex items-center justify-center">
            <div className="flex flex-col items-center w-full max-w-[200px] lg:max-w-none">
              <div className="w-full rounded-md border text-center py-1 mb-1 text-xs sm:text-sm">
                무릎이동 궤적(R)
              </div>
              <div className="w-full aspect-square max-w-[200px] lg:max-w-none mx-auto">
                <KneeTrajectory kneeFileName={mat_right_knee_trajectory_image_name} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FootTrajectoryGridContainer;