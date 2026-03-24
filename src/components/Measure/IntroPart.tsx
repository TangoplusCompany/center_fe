"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { IPartDetail } from "@/types/measure";

const conditionBg: Record<0 | 1 | 2, string> = {
  0: "bg-sub600 dark:bg-gray-600",
  1: "bg-warning",
  2: "bg-danger",
};

const cellConditionBg: Record<0 | 1 | 2, string> = {
  0: "bg-sub100 dark:bg-muted",
  1: "bg-warning",
  2: "bg-danger",
};

const arrowCondition: Record<0 | 1 | 2, string> = {
  0: "text-sub400 dark:text-gray-300",
  1: "text-black dark:text-white",
  2: "text-black dark:text-white",
};

// 각 단계별 셀 색
const levelCellBg: Record<0 | 1 | 2, string> = {
  0: "bg-sub100 dark:bg-muted", // 정상
  1: "bg-sub200 dark:bg-muted", // 주의
  2: "bg-sub300 dark:bg-muted", // 위험
};

export const MEASURE_NAME_MAP: Record<string, string> = {
  turtle_neck: "거북목",
  scoliosis: "경추 측만",
  side_neck_balance: "측면 목 근육",

  shoulder_tilit: "어깨 기울기",
  frozen_shoulder: "오십견",
  shoulder_impingement: "어깨 충돌 증후군",

  bicep_tension: "이두근 긴장",
  elbow_disorder: "팔꿈치 질환",
  elbow_muscle_tension: "팔꿈치 아래팔 근육 긴장",

  hip_tilit: "골반 기울기",
  hip_disorder: "골반 질환",
  hip_knee_tilit: "골반과 무릎 기울기(측면)",

  knee_angle: "골반 무릎 각도(정면)",
  knee_disorder: "무릎 질환 (OHS)",
  hip_knee_ankle_tilit: "골반, 무릎, 발목 기울기(OHS)",

  ankle_angle: "발목 각도",
  left_right_balance: "좌우 무게 균형",
  uppper_lower_balance: "상하 무게 균형",
};

const MeasureIntroPart = ({ 
  title,
  cardData,
  riskLevel,
  rangeLevel,
}: { 
  title: string;
  cardData: IPartDetail; 
  riskLevel: number;
  rangeLevel: number;
}) => {
  const items = Object.entries(cardData);
  const badgeBg = conditionBg[(riskLevel ?? 0) as 0 | 1 | 2];
  
  const levelString = {
    0:"정상",
    1:"주의",
    2:"위험",
  }[riskLevel];
  // 한 줄 렌더링 함수
  
  const renderRangeBoxes = (
    riskLevel: number,  // 화살표 위치(0~2)
    rangeLevel: number, // 표시할 단계값(0~2)
    rowIdx: number,
    rowsLen: number
  ) => {
    const safeRisk = Math.max(0, Math.min(2, riskLevel)) as 0 | 1 | 2;
    const safeRange = Math.max(0, Math.min(2, rangeLevel)); // 0~2

    return (
      <div className="flex w-full h-full">
        {[0, 1, 2].map((index) => {
          const isActive = safeRisk === index;

          // ✅ 윗줄(화살표 줄) 배경: 선택칸은 warning/danger, 나머지는 sub색
          const topBg = isActive
            ? cellConditionBg[safeRisk] // bg-warning / bg-danger 등
            : levelCellBg[index as 0 | 1 | 2]; // bg-sub100/sub200/sub300

          // ✅ 마지막 셀 라운드
          const isLastCell = index === 2;
          const roundClass =
            isLastCell && rowIdx === 0
              ? "rounded-tr-xl"
              : isLastCell && rowIdx === rowsLen - 1
              ? "rounded-br-xl"
              : "";

          return (
            <div
              key={index}
              className={[
                "relative flex-1 flex flex-col overflow-hidden", 
                roundClass,
               
                "border-l border-dashed border-sub300 dark:border-border first:border-l-0",
              ].join(" ")}
            >
              <div className={["flex-[1] flex items-center justify-center", topBg].join(" ")}>
                {isActive && <div className={`text-xs ${arrowCondition[safeRisk]} leading-none`}>▼</div>}
              </div>

              <div className="flex-[1] bg-white dark:bg-card flex items-center justify-center">
                {isActive && (
                  <div className="text-xs leading-none text-foreground">{safeRange + 1}단계</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex rounded-xl border-2 border-sub100 dark:border-border bg-white dark:bg-card shadow-sm h-full">
      {/* 전체 grid */}
      <div className="flex flex-col w-1/4 items-center justify-center text-base font-semibold gap-1 text-foreground">
        <div className="text-center whitespace-normal break-keep">{title}</div>
        <div
          className={cn(
            "px-3 py-1 rounded-full text-xs text-white text-center whitespace-normal break-keep",
            badgeBg,
          )}
        >
          {`${levelString} ${Number(rangeLevel)}단계`}
        </div>
      </div>
      
      {/* 오른쪽 영역 */}
      <div className="flex flex-col w-3/4 h-full border-l dark:border-border">
        {items.map(([measureName, item], idx) => (
          <div key={idx} className={cn(
            "flex flex-1 min-h-0 items-stretch",
            idx !== items.length - 1 && "border-b dark:border-border"
          )}>
            <div className="flex w-1/2 text-sm items-center justify-center border-r dark:border-border px-2 py-1 text-center whitespace-normal break-keep text-foreground">{MEASURE_NAME_MAP[measureName] ?? item?.measure_unit ?? measureName}</div>
            <div className="flex w-1/2 items-stretch">{renderRangeBoxes(item?.risk_level, item?.range_level, idx, items?.length)}</div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default MeasureIntroPart;
