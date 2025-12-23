"use client";

import { LatestMeasureSummary } from "@/types/measure";
import { parseString } from "@/utils/parseString";
import React from "react";

const MeasureSummary = ({ 
  data,
  count
 }: { 
  data : LatestMeasureSummary;
  count: number;
}) => {
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
  const upperRiskString = riskString(data.risk_upper_risk_level);
  const lowerRiskString = riskString(data.risk_lower_risk_level);
  const upperBg = getRiskBgClass(upperRiskString);
  const lowerBg = getRiskBgClass(lowerRiskString);

  return (
    <div className="rounded-3xl border p-5 shadow-sm bg-white">
      {/* 제목 */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <span className="text-xl font-medium">
            {data.user_name}님 최근 리포트 요약
          </span>

          <span className="text-sm text-sub600 rounded-xl bg-sub300 p-2">
            총 측정: {count}회
          </span>
        </div>
      </div>

      {/* 상지 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">상지 결과</h2>
          <span className={`px-3 py-1 ${upperBg} rounded-xl text-sm text-white`}>
            {upperRiskString} {data.risk_upper_range_level}단계
          </span>
        </div>

        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {parseString(data.risk_upper_ment).map((el, key) =>
            el === "" ? <br key={key} /> : <p key={key}>{el}</p>
          )}
        </div>
      </div>

      {/* 하지 */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">하지 결과</h2>
          <span className={`px-3 py-1 ${lowerBg} rounded-xl text-sm text-white`}>
            {lowerRiskString} {data.risk_lower_range_level}단계
          </span>
        </div>

        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {parseString(data.risk_lower_ment).map((el, key) =>
            el === "" ? <br key={key} /> : <p key={key}>{el}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeasureSummary;
