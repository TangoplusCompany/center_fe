"use client";

import { formatComment } from "@/utils/formatComment";
import React from "react";

const MeasureIntroTop = (
  { 
    comment,
    condition,
    level,
  }:
  {
    comment: string
    condition: string
    level: number
  }) => {
  const formattedComment = formatComment(comment);
  // 또는 환경변수에서 가져오기
  const bgCondition = {
    정상: "bg-[#7E7E7E]",
    주의: "bg-warning",
    위험: "bg-danger",
  }[condition] ?? "bg-[#7E7E7E]";
    const textCondition = {
    정상: "text-white",
    주의: "text-warning-foreground",
    위험: "text-danger-foreground",
  }[condition] ?? "bg-[#7E7E7E]";
  return (
    <div className="flex-1 p-4 border rounded-xl bg-white">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">상지 결과</h2>
        <span className={`px-3 py-1 ${bgCondition} ${textCondition} rounded-full text-base`}>
          {condition} {level}단계
        </span>
      </div>
      {/* 코멘트 */}
      <div className="text-base text-gray-700 whitespace-pre-line">
        {formattedComment}
      </div>
    </div>
  );
}

export default MeasureIntroTop;
