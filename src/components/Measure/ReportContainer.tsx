import { useGetMeasureSummary } from "@/hooks/api/measure/useGetMeasureSummary";
import { FootPressureHistory, MeasureFootCOP, MeasureSummary, UpperAndLowerMeasureHistory } from "@/types/measure";
import { useEffect, useState } from "react";
import MeasureSummaryContainer from "./SummaryContainer";
import FootTrajectoryContainer from "./Mat/FootTrajectoryContainer";
import { useGetMeasureFoot } from "@/hooks/api/measure/useGetMeasureFoot";
import { useTranslations } from "next-intl";

export interface MeasureReportProps {
  userSn: number;
  latestSummary: MeasureSummary;
  summaryData: UpperAndLowerMeasureHistory[];
  footData: FootPressureHistory[];
  isMyPage: boolean;
}

const MeasureReportContainer = ({
  userSn,
  latestSummary,
  summaryData,
  footData,
  isMyPage = false,
 }: MeasureReportProps 
) => {
  const t = useTranslations("Index");
  const [selectedMeasureSn, setSelectedMeasureSn] = useState<number | undefined>();
    
    const {
      data: newSummary,
      isLoading: summaryLoading,
      isError: summaryError
    } = useGetMeasureSummary({
      measure_sn: selectedMeasureSn?.toString(),
      user_sn: `${userSn}`,
      isMyPage,
    });
    const {
      data: newFoot,
      isLoading: footLoading,
      isError: footError
    } = useGetMeasureFoot({
      measure_sn: selectedMeasureSn?.toString(),
      user_sn: `${userSn}`,
      isMyPage,
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

      {summaryLoading && <div>{t('loading_1')}</div>}
      {summaryError && <div>데이터를 불러오는데 실패했습니다.</div>}
      {/* 상지 */}
      <MeasureSummaryContainer 
        ment={selectedSummary?.risk_upper_ment} 
        risk_level={selectedSummary?.risk_upper_risk_level}
        range_level={selectedSummary?.risk_upper_range_level} 
        summaryData={summaryData} 
        handleLegendClick={handleLegendClick} 
        dCase={0}
        title={t('result_upper_body')}
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
        title={t('result_lower_body')}
        selectedMeasureSn={selectedMeasureSn}
      />
            {/* 족압 */}
      {footLoading && <div>{t('loading_1')}</div>}
      {footError && <div>{t('date_fetch_failed')}</div>}
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