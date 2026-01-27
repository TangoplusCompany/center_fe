import { useGetMeasureSummary } from "@/hooks/api/measure/useGetMeasureSummary";
import { FootPressureHistory, MeasureFootCOP, MeasureSummary, UpperAndLowerMeasureHistory } from "@/types/measure";
import { useEffect, useState } from "react";
import MeasureSummaryContainer from "./MeasureSummaryContainer";
import FootTrajectoryContainer from "./Mat/FootTrajectoryContainer";
import { useGetMeasureFoot } from "@/hooks/api/measure/useGetMeasureFoot";

export interface MeasureReportProps {
  userSn: number;
  latestSummary: MeasureSummary;
  summaryData: UpperAndLowerMeasureHistory[];
  footData: FootPressureHistory[];
  isResultPage: boolean;
}

const MeasureReportContainer = ({
  userSn,
  latestSummary,
  summaryData,
  footData,
  isResultPage = false,
 }: MeasureReportProps 
) => {

  const [selectedMeasureSn, setSelectedMeasureSn] = useState<number | undefined>();
    
    const {
      data: newSummary,
      isLoading: summaryLoading,
      isError: summaryError
    } = useGetMeasureSummary({
      measure_sn: selectedMeasureSn?.toString(),
      user_sn: `${userSn}`,
      isResultPage,
    });
    const {
      data: newFoot,
      isLoading: footLoading,
      isError: footError
    } = useGetMeasureFoot({
      measure_sn: selectedMeasureSn?.toString(),
      user_sn: `${userSn}`,
      isResultPage,
    });
    const [selectedSummary, setSelectedSummary] = useState<MeasureSummary>(latestSummary);
    const [selectedFootOCP, setSelectedFootOCP] = useState<MeasureFootCOP>(latestSummary);
    
    const handleLegendClick = (measureSn: number) => {
      setSelectedMeasureSn(measureSn);
    };
    // newSummary가 로드되면 selectedSummary 업데이트
    useEffect(() => {
      if (newSummary) {
        setSelectedSummary(newSummary);
      }
      if (newFoot) {
        setSelectedFootOCP(newFoot);
      }
    }, [newSummary, newFoot]);

  return (
    <div className="flex flex-col gap-6">

      {summaryLoading && <div>로딩 중...</div>}
      {summaryError && <div>데이터를 불러오는데 실패했습니다.</div>}
      {/* 상지 */}
      <MeasureSummaryContainer 
        ment={selectedSummary?.risk_upper_ment} 
        risk_level={selectedSummary?.risk_upper_risk_level}
        range_level={selectedSummary?.risk_upper_range_level} 
        summaryData={summaryData} 
        handleLegendClick={handleLegendClick} 
        dCase={0}
        title="상지 결과"
        selectedMeasureSn={selectedMeasureSn}
      />
      {/* 하지 */}
      <MeasureSummaryContainer 
        ment={selectedSummary?.risk_lower_ment} 
        risk_level={selectedSummary?.risk_lower_risk_level}
        range_level={selectedSummary?.risk_lower_range_level} 
        summaryData={summaryData} 
        handleLegendClick={handleLegendClick} 
        dCase={1}
        title="하지 결과"
        selectedMeasureSn={selectedMeasureSn}
      />
            {/* 족압 */}
      {footLoading && <div>로딩 중...</div>}
      {footError && <div>데이터를 불러오는데 실패했습니다.</div>}
      <div>
        <FootTrajectoryContainer 
          footOCP={selectedFootOCP} 
          footData={footData} 
          handleLegendClick={handleLegendClick}
          />
      </div>
    </div>
  );
};

export default MeasureReportContainer;