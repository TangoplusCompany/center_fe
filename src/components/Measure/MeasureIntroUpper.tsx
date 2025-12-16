"use client";

import { formatComment } from "@/utils/formatComment";
import React from "react";


const MeasureIntroUpper = (
  { 
    comment,
    condition,
    level,
  }:
  {
    comment: string
    condition: string
    level: number
  }
) => {

  const formattedComment = formatComment(comment);
  const bgCondition = {
    정상: "bg-primary-foreground",
    주의: "bg-warning",
    위험: "bg-danger",
  }[condition] ?? "bg-primary-foreground";
    const textCondition = {
    정상: "text-white",
    주의: "text-warning-foreground",
    위험: "text-danger-foreground",
  }[condition] ?? "bg-primary-foreground";
  return (
    <div className="flex flex-1 flex-col h-full p-4 border border-sub300 rounded-3xl bg-white">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">상지 결과</h2>
        <span className={`px-3 py-1 ${bgCondition} ${textCondition} rounded-xl text-sm`}>
          {condition} {level}단계
        </span>
      </div>
      {/* 코멘트 */}
      <div className="text-base text-gray-700 whitespace-pre-line mb-4">
        {formattedComment}
      </div>  
    </div>
  );
}

export default MeasureIntroUpper;
