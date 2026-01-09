import { FootPressureHistory, MeasureSummary } from "@/types/measure";
import MatSummary from "./MatSummary";
import FootTrajectoryGridContainer from "./FootTrajectoryGridContainer";
import MeasureSummaryGraph from "../MeasureSummaryGraph";

export interface MatUserDashBoardContainerProps {
  footOCP: MeasureSummary;
  footData: FootPressureHistory[];
  handleLegendClick: (measureSn: number) => void;
}



const FootTrajectoryContainer = ({
  footOCP,
  footData,
  handleLegendClick
}: MatUserDashBoardContainerProps) => {
  const {
    mat_static_horizontal_ment,
    mat_static_vertical_ment,
    mat_ohs_horizontal_ment,
    mat_ohs_vertical_ment,
    mat_ohs_knee_ment,
  } = footOCP;
  return (
    <div className="flex flex-col gap-8 rounded-3xl border-2 border-sub200 p-4">
      <div className="grid grid-cols-2 gap-4 rounded-3xl">
        <FootTrajectoryGridContainer footOCP={footOCP} />
        <MeasureSummaryGraph data={footData} legendClick={handleLegendClick} dCase={2} />      
      </div>
      {/* 코멘트들 */}
      <MatSummary 
        mat_static_horizontal_ment={mat_static_horizontal_ment} 
        mat_static_vertical_ment={mat_static_vertical_ment} 
        mat_ohs_horizontal_ment={mat_ohs_horizontal_ment} 
        mat_ohs_vertical_ment={mat_ohs_vertical_ment} 
        mat_ohs_knee_ment={mat_ohs_knee_ment} 
        />
    </div>
    
  );
};

export default FootTrajectoryContainer;