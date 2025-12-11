"use client";

import { IUserDetailStatic, IUserDetailDynamic, IUserDetailMeasureInfo } from "@/types/user";
import React from "react";
import SkeletonContainer from "./SkeletonContainer";
import MeasureIntroFooter1, { IMatStaticPressure } from "./MeasureIntroFooter1";
import MeasureIntroFooter2, { IMatOhsPressure } from "./MeasureIntroFooter2";
import MeasureIntroFooter3 from "./MeasureIntroFooter3";
import MeasureIntroUpper from "./MeasureIntroUpper";
import MeasureIntroLower from "./MeasureIntroLower";
import { riskLevelMap } from "@/utils/riskLevelMap";
import { PartCard } from "./MeasureIntroPart";

const MeasureIntro = ({ 
  info,
  static0,
  dynamic
}: { 
  info: IUserDetailMeasureInfo 
  static0: IUserDetailStatic
  dynamic: IUserDetailDynamic
}) => {

  // TODO server_sn을 받아서 여기서 6가지 부위 카드 넣기.
  // Top
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
// Footer
const {
  measure_server_mat_image_name,
} = static0;
const {
  mat_hip_down_image_name,
  mat_hip_trajectory_name,
  mat_left_knee_trajectory_image_name,
  mat_right_knee_trajectory_image_name
} = dynamic;
const dummyPartCard: PartCard[] = [
  {
    title: "목",
    condition: "정상",
    level: 1,
    row0name: "압력 분포",
    row0data: "균형적",
    row0level: 1,
    row1name: "최대 압력",
    row1data: "45 kPa",
    row1level: 0,
    row2name: "접촉 면적",
    row2data: "120 cm²",
    row2level: 2,
  },
  {
    title: "어깨",
    condition: "주의",
    level: 2,
    row0name: "압력 분포",
    row0data: "불균형",
    row0level: 1,
    row1name: "최대 압력",
    row1data: "68 kPa",
    row1level: 1,
    row2name: "접촉 면적",
    row2data: "85 cm²",
    row2level: 0,
  },
  {
    title: "팔꿉",
    condition: "위험",
    level: 3,
    row0name: "압력 분포",
    row0data: "심각한 불균형",
    row0level: 2,
    row1name: "최대 압력",
    row1data: "92 kPa",
    row1level: 2,
    row2name: "접촉 면적",
    row2data: "65 cm²",
    row2level: 1,
  },
];

  return (
    <div className="flex flex-col h-full gap-4">
      {/* 상단 영역: 가로로 배치 */}
      <div className="grid grid-cols-[1fr_2fr] gap-4 items-stretch">
        {/* 왼쪽 컴포넌트 */}
        <div>
          <SkeletonContainer data={info} />
        </div>

        {/* 오른쪽: 세로로 2개 */}
        <div className="flex flex-col flex-[2] gap-4">
            <MeasureIntroUpper
              comment= {risk_upper_ment}
              condition={upperCondition}
              level={risk_upper_range_level}
              cardDatas = { dummyPartCard }
            />
            <MeasureIntroLower
              comment={risk_lower_ment}
              condition={lowerCondition}
              level={risk_lower_range_level}
              cardDatas = { dummyPartCard }
            />
        </div>
      </div>

      {/* 하단 영역: 이미지 및 텍스트 3개 가로 배치 */}
      <div className="flex border border-gray-200 rounded-3xl gap-4">
        {/* 첫 번째 */}
        <div className="flex-1 p-4">
          <MeasureIntroFooter1 
            comment={"[좌우 무게 분석]\n" + mat_static_horizontal_ment + "\n[상하 무게 분석]\n" + mat_static_vertical_ment}
            condition={kneeCondition}
            level={mat_static_range_level}
            fileName={measure_server_mat_image_name}
            matStatics={ staticFourCorners }
            />
        </div>

        <div className="flex-1 p-4">
          <MeasureIntroFooter2 
            comment={"[좌우 무게 분석]\n" + mat_ohs_horizontal_ment + "\n[상하 무게 분석]\n" + mat_ohs_vertical_ment}
            footFileName={mat_hip_down_image_name}
            hipFileName={mat_hip_trajectory_name}
            matOhs={ ohsFourCorners }
            />
        </div>

        {/* 세 번째 */}
        <div className="flex-1 p-4">
          <MeasureIntroFooter3 
            comment={"무릎 흔들림 분석\n" + mat_ohs_knee_ment}
            leftKneeFileName={mat_left_knee_trajectory_image_name}
            rightKneeFileName={mat_right_knee_trajectory_image_name}
            />
        </div>
      </div>
    </div>
  );
};

export default MeasureIntro;
