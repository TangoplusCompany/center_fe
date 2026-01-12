"use client";

import { formatComment } from "@/utils/formatComment";
import React from "react";
import { UpperLowerProps } from "./MeasureIntroLower";
import { getRiskString } from "../Util/RiskLevel";


const MeasureIntroUpper = (
  { 
    comment,
    risk_level,
    range_level,
  }: UpperLowerProps
) => {
  const riskString = getRiskString(risk_level);
  const formattedComment = formatComment(comment);
  const borderCondition = {
    0: "border-sub300/50",
    1: "border-warning/50",
    2: "border-danger/50",
  }[risk_level] ?? "bg-primary-foreground";
  const bgCondition = {
    0: "border-sub300/50",
    1: "bg-gradient-to-b from-[#FFA73A]/10 from-[2%] to-white to-[40%]",
    2: "bg-gradient-to-b from-[#FF5252]/10 from-[2%] to-white to-[50%]",
  }[risk_level] ?? "bg-primary-foreground";
  const textCondition = {
    0: "text-secondary",
    1: "text-warningDeep",
    2: "text-dangerDeep",
  }[risk_level] ?? "bg-primary-foreground";
  const textBgCondition = {
    0: "bg-sub300",
    1: "bg-warning",
    2: "bg-danger",
  }[risk_level] ?? "bg-primary-foreground";



  return (
    <div 
      className={`flex flex-1 flex-col h-full p-4 border border-2 ${borderCondition} ${bgCondition} rounded-3xl shadow-[inset_0_6px_12px_rgba(255,255,255,0.25)]`}>
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl font-semibold ${textCondition}`}>상지 결과</h2>
        <span className={`px-3 py-1 ${textBgCondition} rounded-xl text-sm text-white`}>
          {riskString} {range_level}단계
        </span>
      </div>
      {/* 코멘트 */}
      <div className="text-base text-sub800 whitespace-pre-line mb-4">
        {formattedComment}
      </div>  
    </div>
  );
}

export default MeasureIntroUpper;
