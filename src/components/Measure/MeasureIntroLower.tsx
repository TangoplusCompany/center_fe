"use client";

import { formatComment } from "@/utils/formatComment";
import React from "react";
import { useHeightSync } from "./Compare/CompareBody";

const MeasureIntroLower  = (
  { 
    side,
    comment,
    condition,
    level,
    
  }:
  {
    side?: "left" | "right";
    comment: string
    condition: string
    level: number
    
  }
) => {
  const { register, getMinHeight } = useHeightSync();
  const minH = getMinHeight("lower");

  const formattedComment = formatComment(comment);
  const borderCondition = {
      정상: "border-sub300/50",
      주의: "border-warning/50",
      위험: "border-danger/50",
    }[condition] ?? "bg-primary-foreground";
  const bgCondition = {
    정상: "border-sub300/50",
    주의: "bg-gradient-to-b from-[#FFA73A]/10 from-[2%] to-white to-[40%]",
    위험: "bg-gradient-to-b from-[#FF5252]/10 from-[2%] to-white to-[50%]",
  }[condition] ?? "bg-primary-foreground";
  
  
  const textCondition = {
    정상: "text-secondary",
    주의: "text-warningDeep",
    위험: "text-dangerDeep",
  }[condition] ?? "bg-primary-foreground";
  const textBgCondition = {
    정상: "bg-sub300",
    주의: "bg-warning",
    위험: "bg-danger",
  }[condition] ?? "bg-primary-foreground";
  if (!side) {
    return (
      <div >

      </div>
    );
  }
  return (
    <div 
      ref={register("lower", side)}
      style={minH ? { minHeight: minH } : undefined}
      className={`flex flex-1 flex-col h-full p-4 border border-2 ${borderCondition} ${bgCondition} rounded-3xl shadow-[inset_0_4px_8px_rgba(255,255,255,0.25)]`}>
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl font-semibold ${textCondition}`}>하지 결과</h2>
        <span className={`px-3 py-1 ${textBgCondition} rounded-xl text-sm text-white`}>
          {condition} {level}단계
        </span>
      </div>
      {/* 코멘트 */}
      <div className="text-base text-sub800 whitespace-pre-line mb-4">
        {formattedComment}
      </div>
    </div>
  );
}

export default MeasureIntroLower;
