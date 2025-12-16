"use client";

import { IUserDetailStatic, IUserDetailDynamic, IUserDetailMeasureInfo } from "@/types/measure";
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


type LayoutVariant = "grid" | "stack";

const GhostSkeletonBox = ({
  data,
  className,
  onCardClick,
}: {
  data: IUserDetailMeasureInfo;
  className?: string;
  onCardClick?: (slot: CompareSlot) => void;
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onCardClick ? () => onCardClick(currentSlot) : undefined}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
      className={[
        "relative h-full rounded-3xl border border-sub300 box-border",
        "transition cursor-pointer select-none",
        "hover:bg-sub200 active:bg-sub300",
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
  onCompareDialogOpen
}: { 
  layout: LayoutVariant;
  onCompareDialogOpen?: (slot: CompareSlot) => void;
 }) => {
  const dummyInfo = {} as unknown as IUserDetailMeasureInfo;

  const topLeft = 
    <GhostSkeletonBox 
      data={dummyInfo}
      onClick= {onCompareDialogOpen}
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
}: {
  data?: {
    info: IUserDetailMeasureInfo;
    static0: IUserDetailStatic;
    dynamic: IUserDetailDynamic;
  };
  layout?: LayoutVariant;
  onCompareDialogOpen? : (slot: CompareSlot) => void;
}) => {
  // ✅ data 없으면 “빈 Intro” 렌더
  if (!data) return <EmptyIntro layout={layout} onCompareDialogOpen={ onCompareDialogOpen }/>;

  // ✅ data 있을 때만 안전하게 꺼냄
  const { info, static0, dynamic } = data;

  const {
    risk_upper_ment,
    risk_upper_risk_level,
    risk_upper_range_level,
    risk_lower_ment,
    risk_lower_risk_level,
    risk_lower_range_level,

    mat_static_horizontal_ment,
    mat_static_vertical_ment,
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

    mat_ohs_horizontal_ment,
    mat_ohs_vertical_ment,
    mat_ohs_knee_ment,
    mat_ohs_left_top,
    mat_ohs_left_bottom,
    mat_ohs_right_top,
    mat_ohs_right_bottom,
    mat_ohs_left_pressure,
    mat_ohs_right_pressure,
    mat_ohs_top_pressure,
    mat_ohs_bottom_pressure,
  } = info;

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

  const { measure_server_mat_image_name } = static0;
  const {
    mat_hip_down_image_name,
    mat_hip_trajectory_name,
    mat_left_knee_trajectory_image_name,
    mat_right_knee_trajectory_image_name,
  } = dynamic;

  // const dummyPartCard: PartCard[] = [
  //   {
  //     title: "목",
  //     condition: "정상",
  //     level: 1,
  //     row0name: "압력 분포",
  //     row0data: "균형적",
  //     row0level: 1,
  //     row1name: "최대 압력",
  //     row1data: "45 kPa",
  //     row1level: 0,
  //     row2name: "접촉 면적",
  //     row2data: "120 cm²",
  //     row2level: 2,
  //   },
  //   {
  //     title: "어깨",
  //     condition: "주의",
  //     level: 2,
  //     row0name: "압력 분포",
  //     row0data: "불균형",
  //     row0level: 1,
  //     row1name: "최대 압력",
  //     row1data: "68 kPa",
  //     row1level: 1,
  //     row2name: "접촉 면적",
  //     row2data: "85 cm²",
  //     row2level: 0,
  //   },
  //   {
  //     title: "팔꿉",
  //     condition: "위험",
  //     level: 3,
  //     row0name: "압력 분포",
  //     row0data: "심각한 불균형",
  //     row0level: 2,
  //     row1name: "최대 압력",
  //     row1data: "92 kPa",
  //     row1level: 2,
  //     row2name: "접촉 면적",
  //     row2data: "65 cm²",
  //     row2level: 1,
  //   },
  // ];

  const topLeft = (
    <div className="h-full">
      <SkeletonContainer data={info} />
    </div>
  );

  const topRight = (
    <div className="flex h-full flex-col gap-4">
      <MeasureIntroUpper
        comment={risk_upper_ment}
        condition={upperCondition}
        level={risk_upper_range_level}
      />
      <MeasureIntroLower
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
          hipFileName={mat_hip_trajectory_name}
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
            hipFileName={mat_hip_trajectory_name}
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

  return (
    <div className="flex flex-col h-full gap-4">
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

      {footer}
    </div>
  );
};

export default MeasureIntro;