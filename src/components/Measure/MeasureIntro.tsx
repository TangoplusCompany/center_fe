"use client";

import { IPartDetailData, IUserDetailMeasureInfo, IUserMeasureInfoResponse } from "@/types/measure";
import React from "react";
import SkeletonContainer from "./SkeletonContainer";
import MeasureIntroFooter1, { IMatStaticPressure } from "./MeasureIntroFooter1";
import MeasureIntroFooter2, { IMatOhsPressure } from "./MeasureIntroFooter2";
import MeasureIntroFooter3 from "./MeasureIntroFooter3";
import MeasureIntroUpper from "./MeasureIntroUpper";
import MeasureIntroLower from "./MeasureIntroLower";
import { riskLevelMap } from "@/utils/riskLevelMap";
import SkeletonBox from "./SkeletonBox";
import { CompareSlot } from "@/types/compare";
import MeasureIntroPart from "./MeasureIntroPart";


type LayoutVariant = "grid" | "stack";

const GhostSkeletonBox = ({
  data,
  className,
  onCardClick,
  currentSlot,
}: {
  data: IUserDetailMeasureInfo;
  className?: string;
  onCardClick?: (slot: CompareSlot) => void;
  currentSlot?: CompareSlot;
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onCardClick && currentSlot ? () => onCardClick(currentSlot) : undefined}
      className={[
        "relative h-full rounded-3xl border-2 border-sub300/50 border-dashed box-border",
        "transition cursor-pointer select-none",
        "hover:border-sub400 active:bg-sub400",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-toggleAccent",
        className ?? "",
      ].join(" ")}
    >
      {/* ✅ 실제 SkeletonBox를 그대로 깔되, 투명 처리 + 입력 막기 */}
      <div className="h-full opacity-0 pointer-events-none">
        <SkeletonBox data={data} />
      </div>

      {/* ✅ 안내 문구 오버레이 */}
      <div className="absolute inset-0 flex items-center justify-center">
        비교할 항목을 선택해주세요
      </div>
    </div>
  );
};
// const EmptyBorderBox = ({ className }: { className?: string }) => (
//   <div className={["w-full h-full min-h-0 rounded-3xl border border-sub300", className ?? ""].join(" ")} />
// );

const EmptyIntro = ({ 
  layout,
  onCompareDialogOpen,
  currentSlot,
}: { 
  layout: LayoutVariant;
  onCompareDialogOpen?: (slot: CompareSlot) => void;
  currentSlot?: CompareSlot;
}) => {
  const dummyInfo = {} as unknown as IUserDetailMeasureInfo;

  const topLeft = 
    <GhostSkeletonBox 
      data={dummyInfo}
      onCardClick= {onCompareDialogOpen}
      currentSlot={currentSlot}
      />;

  return (
    <div className="flex flex-col h-full min-h-0 gap-4">
      {/* ✅ 상단(좌/우) 영역: 남는 높이 전부 */}
      <div className="flex-1 min-h-0">
        {layout === "grid" ? (
          <div className="grid h-full min-h-0 grid-cols-[1fr_2fr] gap-4 items-stretch">
            <div className="h-full min-h-0">{topLeft}</div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex-1">{topLeft}</div>
          </div>
        )}
      </div>
    </div>
  );
};
const MeasureIntro = ({
  data,
  layout = "grid",
  onCompareDialogOpen,
  currentSlot,
}: {
  data?: IUserMeasureInfoResponse;
  layout?: LayoutVariant;
  onCompareDialogOpen? : (slot: CompareSlot) => void;
  currentSlot?: CompareSlot;
}) => {
  // ✅ data 없으면 “빈 Intro” 렌더
  if (!data) return <EmptyIntro layout={layout} onCompareDialogOpen={ onCompareDialogOpen } currentSlot={ currentSlot}/>;
  
  const slotMap: Record<number, "left" | "right"> = {
    0: "left",
    1: "right",
  };
  const slotSide = currentSlot !== undefined ? slotMap[currentSlot] : undefined;
  console.log(currentSlot)
  console.log(slotSide)
  const {
    risk_upper_ment,
    risk_upper_risk_level,
    risk_upper_range_level,
    risk_lower_ment,
    risk_lower_risk_level,
    risk_lower_range_level,
    mat_static_risk_level,
    mat_static_range_level,
    mat_static_left_top,
    mat_static_left_bottom,
    mat_static_right_top,
    mat_static_right_bottom,
    mat_static_left_pressure,
    mat_static_right_pressure,
    mat_static_top_pressure,
    mat_static_bottom_pressure,

    mat_ohs_left_top,
    mat_ohs_left_bottom,
    mat_ohs_right_top,
    mat_ohs_right_bottom,
    mat_ohs_left_pressure,
    mat_ohs_right_pressure,
    mat_ohs_top_pressure,
    mat_ohs_bottom_pressure,
    
  } = data.result_summary_data;

  const staticFourCorners: IMatStaticPressure = {
    leftTopPressure: mat_static_left_top,
    leftBottomPressure: mat_static_left_bottom,
    rightTopPressure: mat_static_right_top,
    rightBottomPressure: mat_static_right_bottom,
    leftPressure: Math.round(mat_static_left_pressure),
    rightPressure: Math.round(mat_static_right_pressure),
    topPressure: Math.round(mat_static_top_pressure),
    bottomPressure: Math.round(mat_static_bottom_pressure),
  };

  const ohsFourCorners: IMatOhsPressure = {
    leftTopPressure: mat_ohs_left_top,
    leftBottomPressure: mat_ohs_left_bottom,
    rightTopPressure: mat_ohs_right_top,
    rightBottomPressure: mat_ohs_right_bottom,
    leftPressure: Math.round(mat_ohs_left_pressure),
    rightPressure: Math.round(mat_ohs_right_pressure),
    topPressure: Math.round(mat_ohs_top_pressure),
    bottomPressure: Math.round(mat_ohs_bottom_pressure),
  };

  const upperCondition = riskLevelMap[risk_upper_risk_level as 0 | 1 | 2];
  const lowerCondition = riskLevelMap[risk_lower_risk_level as 0 | 1 | 2];
  const kneeCondition = riskLevelMap[mat_static_risk_level as 0 | 1 | 2];

  const { 
    measure_server_mat_image_name,
    mat_static_horizontal_ment,
    mat_static_vertical_ment,
   } = data.static_mat_data;
  const {
    mat_hip_down_image_name,
    mat_hip_trajectory_image_name,
    mat_left_knee_trajectory_image_name,
    mat_right_knee_trajectory_image_name,
    mat_ohs_horizontal_ment,
    mat_ohs_vertical_ment,
    mat_ohs_knee_ment,
  } = data.dynamic_mat_data;

  const PART_ORDER: { key: keyof IPartDetailData; label: string }[] = [
    { key: "neck", label: "목" },
    { key: "shoulder", label: "어깨" },
    { key: "elbow", label: "팔꿈치" },
    { key: "hip", label: "고관절" },
    { key: "knee", label: "무릎" },
    { key: "ankle", label: "발목" },
  ];

  const topLeft = (
    <div className="h-full">
      <SkeletonContainer data={data.result_summary_data} />
    </div>
  );

  const topRight = (
    <div className="flex h-full flex-col gap-4">
      <MeasureIntroUpper
        side={slotSide}
        comment={risk_upper_ment}
        condition={upperCondition}
        level={risk_upper_range_level}
      />
      <MeasureIntroLower
        side={slotSide}
        comment={risk_lower_ment}
        condition={lowerCondition}
        level={risk_lower_range_level}
        
      />
    </div>
  );

  const footer =
    layout === "stack" ? (
      <div className="border border-sub300 rounded-3xl flex flex-col gap-4 p-4">
        <MeasureIntroFooter1
          comment={
            "[좌우 무게 분석]\n" +
            (mat_static_horizontal_ment ?? "\n") +
            "\n[상하 무게 분석]\n" +
            (mat_static_vertical_ment ?? "\n")
          }
          condition={kneeCondition}
          level={mat_static_range_level}
          fileName={measure_server_mat_image_name}
          matStatics={staticFourCorners}
        />
        <MeasureIntroFooter2
          comment={
            "[좌우 무게 분석]\n" +
            (mat_ohs_horizontal_ment ?? "\n") +
            "\n[상하 무게 분석]\n" +
            (mat_ohs_vertical_ment ?? "\n")
          }
          footFileName={mat_hip_down_image_name}
          hipFileName={mat_hip_trajectory_image_name}
          matOhs={ohsFourCorners}
        />
        <MeasureIntroFooter3
          comment={"무릎 흔들림 분석\n" + (mat_ohs_knee_ment ?? "")}
          leftKneeFileName={mat_left_knee_trajectory_image_name}
          rightKneeFileName={mat_right_knee_trajectory_image_name}
        />
      </div>
    ) : (
      <div className="flex border border-sub300 rounded-3xl gap-4">
        <div className="flex-1 p-4">
          <MeasureIntroFooter1
            comment={
              "[좌우 무게 분석]\n" +
              (mat_static_horizontal_ment ?? "\n") +
              "\n[상하 무게 분석]\n" +
              (mat_static_vertical_ment ?? "\n")
            }
            condition={kneeCondition}
            level={mat_static_range_level}
            fileName={measure_server_mat_image_name}
            matStatics={staticFourCorners}
          />
        </div>
        <div className="flex-1 p-4">
          <MeasureIntroFooter2
            comment={
              "[좌우 무게 분석]\n" +
              (mat_ohs_horizontal_ment ?? "\n") +
              "\n[상하 무게 분석]\n" +
              (mat_ohs_vertical_ment ?? "\n")
            }
            footFileName={mat_hip_down_image_name}
            hipFileName={mat_hip_trajectory_image_name}
            matOhs={ohsFourCorners}
          />
        </div>
        <div className="flex-1 p-4">
          <MeasureIntroFooter3
            comment={"무릎 흔들림 분석\n" + (mat_ohs_knee_ment ?? "")}
            leftKneeFileName={mat_left_knee_trajectory_image_name}
            rightKneeFileName={mat_right_knee_trajectory_image_name}
          />
        </div>
      </div>
    );
  type PartKey = "neck" | "shoulder" | "elbow" | "hip" | "knee" | "ankle";
  type RiskLevelKey = `risk_level_${PartKey}`;
  type RangeLevelKey = `range_level_${PartKey}`;
  return (
    <div className="flex flex-col gap-4">
      {layout === "grid" ? (
        <div className="grid grid-cols-[1fr_2fr] gap-4 items-stretch">
          <div className="h-full">{topLeft}</div>
          <div className="h-full">{topRight}</div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div>{topLeft}</div>
          <div>{topRight}</div>
        </div>
      )}
      {layout === "grid" ? (
        <div className="rounded-3xl border p-4">
          {/* 상체 */}
          <div className="text-base font-semibold mb-2">상체 분석</div>
          <div className="grid grid-cols-3 auto-rows-fr gap-4">
            {PART_ORDER.slice(0, 3).map(({ key, label }) => {
              const partData = data.detail_data[key];
              if (!partData) return null;

              const partKey = key as PartKey;
              const riskLevel =
                data.result_summary_data[`risk_level_${partKey}` as RiskLevelKey];
              const rangeLevel =
                data.result_summary_data[`range_level_${partKey}` as RangeLevelKey];

              return (
                <MeasureIntroPart
                  key={key}
                  title={label}
                  cardData={partData}
                  riskLevel={riskLevel}
                  rangeLevel={rangeLevel}
                />
              );
            })}
          </div>

          {/* 하체 */}
          <div className="text-base font-semibold mt-4 mb-2">하체 분석</div>
          <div className="grid grid-cols-3 auto-rows-fr gap-4">
            {PART_ORDER.slice(3, 6).map(({ key, label }) => {
              const partData = data.detail_data[key];
              if (!partData) return null;

              const partKey = key as PartKey;
              const riskLevel =
                data.result_summary_data[`risk_level_${partKey}` as RiskLevelKey];
              const rangeLevel =
                data.result_summary_data[`range_level_${partKey}` as RangeLevelKey];

              return (
                <MeasureIntroPart
                  key={key}
                  title={label}
                  cardData={partData}
                  riskLevel={riskLevel}
                  rangeLevel={rangeLevel}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {PART_ORDER.map(({ key, label }) => {
            const partData = data.detail_data[key];
            if (!partData) return null;
            const partKey = key as PartKey;
            const riskLevel =
              data.result_summary_data[`risk_level_${partKey}` as RiskLevelKey];
            const rangeLevel =
              data.result_summary_data[`range_level_${partKey}` as RangeLevelKey];
            return (
              <MeasureIntroPart
                key={key}
                title={label}
                cardData={partData}
                riskLevel={riskLevel}
                rangeLevel={rangeLevel}
              />
            );
          })}
        </div>
      )}

      {footer}
    </div>
  );
};

export default MeasureIntro;