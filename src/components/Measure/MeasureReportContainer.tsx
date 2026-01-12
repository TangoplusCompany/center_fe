import { useGetMeasureSummary } from "@/hooks/api/measure/useGetMeasureSummary";
import { FootPressureHistory, MeasureSummary, UpperAndLowerMeasureHistory } from "@/types/measure";
import { useEffect, useState } from "react";
import MeasureSummaryContainer from "./MeasureSummaryContainer";
import FootTrajectoryContainer from "./Mat/FootTrajectoryContainer";

export interface MeasureSummaryProps {
  userSn: number;
  latestSummary: MeasureSummary;
  summaryData: UpperAndLowerMeasureHistory[];
  footData: FootPressureHistory[];
}

const MeasureReportContainer = ({
  userSn,
  latestSummary,
  summaryData,
  footData,

 }: MeasureSummaryProps 
) => {
  const [selectedMeasureSn, setSelectedMeasureSn] = useState<number | undefined>();
    
    const {
      data: newSummary,
      isLoading: summaryLoading,
      isError: summaryError
    } = useGetMeasureSummary(
      selectedMeasureSn?.toString(), // number를 string으로 변환
      `${userSn}`
    );
    const [selectedSummary, setSelectedSummary] = useState<MeasureSummary>(latestSummary);
  
    
    const handleLegendClick = (measureSn: number) => {
      setSelectedMeasureSn(measureSn);
    };
    
    // newSummary가 로드되면 selectedSummary 업데이트
    useEffect(() => {
      if (newSummary) {
        setSelectedSummary(newSummary);
      }
    }, [newSummary]);
    
  return (
    <div className="flex flex-col gap-6">
      {/* TODO 그래프 레이아웃 변경 */}
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
      />
      {/* 하지 */}
      <MeasureSummaryContainer 
        ment={selectedSummary?.risk_lower_ment} 
        risk_level={selectedSummary?.risk_lower_risk_level}
        range_level={selectedSummary?.risk_lower_range_level} 
        summaryData={summaryData} 
        handleLegendClick={handleLegendClick} 
        dCase={1}
      />
      {/* 족압 */}
      <div>
        <FootTrajectoryContainer 
          footOCP={selectedSummary} 
          footData={footData} 
          handleLegendClick={handleLegendClick} 
          />
      </div>
    </div>
  );
};

export default MeasureReportContainer;