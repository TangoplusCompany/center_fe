"use client";

import { MeasureSummary, UpperAndLowerMeasureHistory } from "@/types/measure";
import { parseString } from "@/utils/parseString";
import React, { useEffect, useState } from "react";
import MeasureSummaryGraph from "./MeasureSummaryGraph";
import { useGetMeasureSummary } from "@/hooks/api/measure/useGetMeasureSummary";

export interface SummaryProps {
  userSn: number;
  latestSummary: MeasureSummary;
  graphData: UpperAndLowerMeasureHistory[];
  count: number;
}

const MeasureSummaryContainer = ({ 
  userSn,
  latestSummary,
  graphData,
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

  const riskString = (level?: string) => 
  ({
    "0": "정상",
    "1": "주의",
    "2": "위험"
  } as const)[level ?? "0"] ?? "정상";

  const getRiskBgClass = (level?: string) =>
  ({
    정상: "bg-sub300",
    주의: "bg-warning",
    위험: "bg-danger",
  } as const)[level as "정상" | "주의" | "위험"] ?? "bg-primary-foreground";

  // 사용
  const upperRiskString = riskString(selectedSummary?.risk_upper_risk_level);
  const lowerRiskString = riskString(selectedSummary?.risk_lower_risk_level);
  const upperBg = getRiskBgClass(upperRiskString);
  const lowerBg = getRiskBgClass(lowerRiskString);

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
      <MeasureSummaryGraph data={graphData} legendClick={handleLegendClick}/>

      {/* 상지 */}
      <div className="grid grid-cols-2 gap-4">
        <div >
          <div className="flex justify-between items-center py-2">
            <h2 className="text-xl font-semibold">상지 결과</h2>
            <span className={`px-3 py-1 ${upperBg} rounded-xl text-sm text-white`}>
              {upperRiskString} {selectedSummary?.risk_upper_range_level}단계
            </span>
          </div>

          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {parseString(selectedSummary?.risk_upper_ment).map((el, key) =>
              el === "" ? <br key={key} /> : <p key={key}>{el}</p>
            )}
          </div>
        </div>

        {/* 하지 */}
        <div>
          <div className="flex justify-between items-center py-2">
            <h2 className="text-xl font-semibold">하지 결과</h2>
            <span className={`px-3 py-1 ${lowerBg} rounded-xl text-sm text-white`}>
              {lowerRiskString} {selectedSummary?.risk_lower_range_level}단계
            </span>
          </div>

          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {parseString(selectedSummary?.risk_lower_ment).map((el, key) =>
              el === "" ? <br key={key} /> : <p key={key}>{el}</p>
            )}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default MeasureSummaryContainer;
