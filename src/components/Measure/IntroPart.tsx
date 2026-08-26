"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { IPartDetail } from "@/types/measure";
import { useTranslations } from "next-intl";

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
  0: "bg-sub100 dark:bg-sub700", // 정상
  1: "bg-sub200 dark:bg-sub600", // 주의
  2: "bg-sub300 dark:bg-sub400", // 위험
};

export const MEASURE_NAME_MAP: Record<string, string> = {
  turtle_neck: "info_part_data_neck_0",
  scoliosis: "info_part_data_neck_1",
  side_neck_balance: "info_part_data_neck_2",

  shoulder_tilit: "info_part_data_shoulder_slope",
  frozen_shoulder: "info_part_data_frozen_shoulder",
  shoulder_impingement: "info_part_data_impingement",

  bicep_tension: "info_part_data_biceps_tension",
  elbow_disorder: "info_part_data_elbow_disease",
  elbow_muscle_tension: "info_part_data_forearm_tension",

  hip_tilit: "info_part_data_pelvis_slope",
  hip_disorder: "info_part_data_pelvis_disease",
  hip_knee_tilit: "info_part_data_pelvis_knee_slope_side",

  knee_angle: "info_part_data_pelvis_knee_angle_front",
  knee_disorder: "info_part_data_knee_disease_ohs",
  hip_knee_ankle_tilit: "info_part_data_pelvis_knee_ankle_slope_ohs",

  ankle_angle: "info_part_data_ankle_angle",
  left_right_balance: "info_part_data_weight_balance_lr",
  uppper_lower_balance: "info_part_data_weight_balance_tb",
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
  const t = useTranslations("Index");
  const items = Object.entries(cardData);
  const badgeBg = conditionBg[(riskLevel ?? 0) as 0 | 1 | 2];
  
  const levelString = {
    0:"grade_normal",
    1:"grade_caution",
    2:"grade_danger",
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

              <div className="flex-[1] bg-white dark:bg-sub800 flex items-center justify-center">
                {isActive && (
                  <div className="text-xs leading-none text-sub800 dark:text-sub100">{safeRange + 1}{t('rom_stage')}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex rounded-xl border-2 border-sub100 dark:border-border bg-white dark:bg-sub700 shadow-sm h-full">
      {/* 전체 grid */}
      <div className="flex flex-col w-1/4 items-center justify-center text-base font-semibold gap-1 text-sub800 dark:text-sub100">
        <div className="text-center whitespace-normal break-keep">{t(title)}</div>
        <div
          className={cn(
            "px-3 py-1 rounded-full text-xs text-white text-center whitespace-normal break-keep",
            badgeBg,
          )}
        >
          {`${t(levelString!)} ${Number(rangeLevel)}${t('rom_stage')}`}
        </div>
      </div>
      
      {/* 오른쪽 영역 */}
      <div className="flex flex-col w-3/4 h-full border-l dark:border-border">
        {items.map(([measureName, item], idx) => (
          <div key={idx} className={cn(
            "flex flex-1 min-h-0 items-stretch",
            idx !== items.length - 1 && "border-b dark:border-border"
          )}>
            <div className="flex w-1/2 text-sm items-center justify-center border-r dark:border-border px-2 py-1 text-center whitespace-normal break-keep text-sub800 dark:text-sub100">{t(MEASURE_NAME_MAP[measureName]) ?? item?.measure_unit ?? measureName}</div>
            <div className="flex w-1/2 items-stretch">{renderRangeBoxes(item?.risk_level, item?.range_level, idx, items?.length)}</div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default MeasureIntroPart;
