"use client";

import { FootPressureHistory, MeasureSummary, UpperAndLowerMeasureHistory } from "@/types/measure";
import React, { useEffect, useState } from "react";
import MeasureSummaryGraph from "./MeasureSummaryGraph";
import { useGetMeasureSummary } from "@/hooks/api/measure/useGetMeasureSummary";
import MeasureSummaryUnit from "./MeasureSummaryUnit";
import MatUserDashBoardContainer from "./Mat/MatUserDashBoardContainer";


export interface SummaryProps {
  userSn: number;
  latestSummary: MeasureSummary;
  summaryData: UpperAndLowerMeasureHistory[];
  footData: FootPressureHistory[];
  count: number;
}

const MeasureSummaryContainer = ({ 
  userSn,
  latestSummary,
  summaryData,
  footData,
  count
 }: SummaryProps 
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
    <div className="flex flex-col gap-4 rounded-3xl border p-5 shadow-sm bg-white">
      
      {/* 제목 */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-medium">
            {selectedSummary?.user_name}님 최근 리포트 요약
          </span>

          <span className="text-sm text-sub600 rounded-xl bg-sub300 p-2">
            총 측정: {count}회
          </span>
        </div>
      </div>

      {/* TODO 그래프 레이아웃 변경 */}
      {summaryLoading && <div>로딩 중...</div>}
      {summaryError && <div>데이터를 불러오는데 실패했습니다.</div>}
      {/* 상지 */}
      <div className="grid grid-cols-2 gap-4">
        <MeasureSummaryUnit 
          ment={selectedSummary?.risk_upper_ment} 
          risk_level={selectedSummary?.risk_upper_risk_level} 
          range_level={selectedSummary?.risk_upper_range_level}
        />
        <MeasureSummaryGraph data={summaryData} legendClick={handleLegendClick} dCase={0}/>      
      </div>
      {/* 하지 */}
      <div className="grid grid-cols-2 gap-4">
        <MeasureSummaryUnit 
          ment={selectedSummary?.risk_upper_ment} 
          risk_level={selectedSummary?.risk_upper_risk_level} 
          range_level={selectedSummary?.risk_upper_range_level}
        />
        <MeasureSummaryGraph data={summaryData} legendClick={handleLegendClick} dCase={1}/>      
      </div>
      {/* 족압 */}
      <div className="grid grid-cols-2 gap-4">

        <MatUserDashBoardContainer footOCP={selectedSummary} />
        <MeasureSummaryGraph data={footData} legendClick={handleLegendClick} dCase={2}/>      
      </div>

      
    </div>
  );
};

export default MeasureSummaryContainer;
