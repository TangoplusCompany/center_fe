"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PartCard {
  title: string;
  condition: string; // 정상 / 주의 / 위험
  level: number;
  row0name: string;
  row0data: string;
  row0level: number; // 0: 정상, 1: 주의, 2: 위험
  row1name: string;
  row1data: string;
  row1level: number;
  row2name: string;
  row2data: string;
  row2level: number;
}

const conditionBg: Record<string, string> = {
  정상: "bg-primary-foreground",
  주의: "bg-warning",
  위험: "bg-danger",
};

const conditionText: Record<string, string> = {
  정상: "text-white",
  주의: "text-warning-foreground",
  위험: "text-danger-foreground",
};

// 각 단계별 셀 색
const levelCellBg: Record<number, string> = {
  0: "bg-primary-foreground", // 정상
  1: "bg-warning", // 주의
  2: "bg-danger", // 위험
};

// 비활성 셀 배경
const inactiveCellBg = "bg-[#F2F2F2]";

const MeasureIntroPart = ({ cardData }: { cardData: PartCard }) => {
  const {
    title,
    condition,
    level,
    row0name,
    row0data,
    row0level,
    row1name,
    row1data,
    row1level,
    row2name,
    row2data,
    row2level,
  } = cardData;

  const badgeBg = conditionBg[condition] ?? "bg-primary-foreground";
  const badgeText = conditionText[condition] ?? "text-white";

  // 한 줄 렌더링 함수
  const renderGridRow = (
    name: string,
    data: string,
    lvl: number,
  ) => {
    return (
      <>
        {/* 이름 칸 */}
        <div className="py-2 border-t border-gray-200 text-[11px] leading-[1.3] text-gray-600 flex items-center justify-center mx-2">
          {name}
        </div>

        {[0, 1, 2].map((col) => {
          const isActive = col === lvl;
          const topBgClass = isActive ? levelCellBg[lvl] : inactiveCellBg;

          const stageText = `${lvl + 1}단계`; // 0→1단계, 1→2단계, 2→3단계

          return (
            <div key={col} className="flex flex-col w-full border-t border-gray-200">
              
              {/* 🔹 1행: 화살표 + 배경색 */}
              <div
                className={cn(
                  "flex items-center justify-center h-5 text-[10px]",
                  topBgClass
                )}
              >
                {isActive && "▼"}
              </div>

              {/* 🔹 2행: 단계 텍스트 + 점선 구분 */}
              <div
                className={cn(
                  "flex items-center justify-center h-5 text-[10px] bg-white",
                  col < 2 && "border-r border-dotted border-gray-300" // 마지막 제외
                )}
              >
                {isActive && stageText}
              </div>
            </div>
          );
        })}
      </>
    );
  };


  return (
    <div className="flex flex-col rounded-3xl border bg-white px-4 py-3 shadow-sm h-full">
      {/* 전체 grid */}
      <div className="grid grid-cols-[64px,2fr,1fr,1fr,1fr] justify-center">
        {/* ── 헤더 row ─────────────────────────────── */}
        <div className="flex items-center justify-center text-lg font-semibold text-gray-800 pb-2">
          {title}
        </div>

        <div className="flex items-center justify-center pb-2">
          <span
            className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold",
              badgeBg,
              badgeText
            )}
          >
            {condition} {level}단계
          </span>
        </div>

        <div className="flex items-center justify-center text-xs text-gray-600 pb-2">
          정상
        </div>
        <div className="flex items-center justify-center text-xs text-gray-600 pb-2">
          주의
        </div>
        <div className="flex items-center justify-center text-xs text-gray-600 pb-2">
          위험
        </div>
        
       
        <div className="row-span-3 w-16 h-full rounded-xl border border-[#E0E0E0] flex items-center justify-center">
          <span className="text-gray-300 text-xs">IMG</span>
        </div>

        
        {renderGridRow(row0name, row0data, row0level)}
        {renderGridRow(row1name, row1data, row1level)}
        {renderGridRow(row2name, row2data, row2level)}
      </div>
    </div>
    );

};

export default MeasureIntroPart;
