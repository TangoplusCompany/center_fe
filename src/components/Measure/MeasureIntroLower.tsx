"use client";

import { cn } from "@/lib/utils";
import { formatComment } from "@/utils/formatComment";
import React, { useState } from "react";
import MeasureIntroPart, { PartCard } from "./MeasureIntroPart";

const MeasureIntroLower  = (
  { 
    comment,
    condition,
    level,
    cardDatas
  }:
  {
    comment: string
    condition: string
    level: number
    cardDatas: PartCard[]
  }
) => {
  const [expanded, setExpanded] = useState(false);
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
    <div className="flex flex-1 flex-col h-full p-4 border rounded-3xl bg-white">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">하지 결과</h2>
        <span className={`px-3 py-1 ${bgCondition} ${textCondition} rounded-xl text-sm`}>
          {condition} {level}단계
        </span>
      </div>
      {/* 코멘트 */}
      <div className="text-base text-gray-700 whitespace-pre-line mb-4">
        {formattedComment}
      </div>

      {/* expanded 상태에 따라 조건부 렌더링 */}
      {expanded && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 animate-in fade-in slide-in-from-top-4 duration-200">
          {cardDatas.map((card, idx) => (
            <MeasureIntroPart key={idx} cardData={card} />
          ))}
        </div>
      )}
      <div className="mt-auto sticky bottom-3 flex justify-center">
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-all duration-200 mx-auto"
        >
          <span>{expanded ? "접기" : "상세 보기"}</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/ic_arrow_circle_down.svg"
            alt="카드 접기/펼치기 버튼"
            width={20}
            height={20}
            className={cn(
              "transition-transform duration-300",
              expanded && "rotate-180"
            )}  
          />
        </button>
      </div>
    </div>
  );
}

export default MeasureIntroLower;
