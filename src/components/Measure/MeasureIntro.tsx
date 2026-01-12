"use client";

import { IPartDetailData, IUserMeasureInfoResponse } from "@/types/measure";
import React from "react";
import SkeletonContainer from "./SkeletonContainer";
import FootStaticContainer, { IMatStaticPressure } from "./Mat/FootStaticContainer";
import FootDynamicContainer, { IMatOhsPressure } from "./Mat/FootDynamicContainer";
import KneeTrajectory from "./Mat/KneeTrajectoryContainer";
import MeasureIntroUpper from "./MeasureIntroUpper";
import MeasureIntroLower from "./MeasureIntroLower";
import MeasureIntroPart from "./MeasureIntroPart";

const MeasureIntro = ({
  data,
}: {
  data: IUserMeasureInfoResponse;
}) => {
  
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
        comment={risk_upper_ment}
        risk_level={risk_upper_risk_level}
        range_level={risk_upper_range_level}
      />
      <MeasureIntroLower
        comment={risk_lower_ment}
        risk_level={risk_lower_risk_level}
        range_level={risk_lower_range_level}
        
      />
    </div>
  );
  
  const footer =
    <div className="border border-sub300 rounded-3xl flex gap-4 p-4">
      <FootStaticContainer
        comment={
          "[좌우 무게 분석]\n" +
          (mat_static_horizontal_ment ?? "\n") +
          "\n[상하 무게 분석]\n" +
          (mat_static_vertical_ment ?? "\n")
        }
        risk_level={mat_static_risk_level}
        range_level={mat_static_range_level}
        fileName={measure_server_mat_image_name}
        matStatics={staticFourCorners}
        lCase={0}
      />
      <FootDynamicContainer
        comment={
          "[좌우 무게 분석]\n" +
          (mat_ohs_horizontal_ment ?? "\n") +
          "\n[상하 무게 분석]\n" +
          (mat_ohs_vertical_ment ?? "\n")
        }
        footFileName={mat_hip_down_image_name}
        hipFileName={mat_hip_trajectory_image_name}
        matOhs={ohsFourCorners}
        lCase={0}
      />
      <KneeTrajectory
        comment={"무릎 흔들림 분석\n" + (mat_ohs_knee_ment ?? "")}
        leftKneeFileName={mat_left_knee_trajectory_image_name}
        rightKneeFileName={mat_right_knee_trajectory_image_name}
      />
    </div>
  type PartKey = "neck" | "shoulder" | "elbow" | "hip" | "knee" | "ankle";
  type RiskLevelKey = `risk_level_${PartKey}`;
  type RangeLevelKey = `range_level_${PartKey}`;
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[1fr_2fr] gap-4 items-stretch">
        <div className="h-full">{topLeft}</div>
        <div className="h-full">{topRight}</div>
      </div>
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

      {footer}
    </div>
  );
};

export default MeasureIntro;