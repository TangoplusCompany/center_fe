"use client";

import { IUserDetailStatic, IUserDetailDynamic, IUserDetailMeasureInfo } from "@/types/user";
import React from "react";
import SkeletonContainer from "./SkeletonContainer";
import MeasureIntroFooter1 from "./MeasureIntroFooter1";
import MeasureIntroFooter2 from "./MeasureIntroFooter2";
import MeasureIntroFooter3 from "./MeasureIntroFooter3";
import MeasureIntroTop from "./MeasureIntroTop";
import MeasureIntroBottom from "./MeasureIntroBottom";
import { riskLevelMap } from "@/utils/riskLevelMap";

const MeasureIntro = ({ 
  info,
  static0,
  dynamic
}: { 
  info: IUserDetailMeasureInfo 
  static0: IUserDetailStatic
  dynamic: IUserDetailDynamic
}) => {

  // TODO 이제 여기서 url 빼기, 
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
  mat_ohs_horizontal_ment,
  mat_ohs_vertical_ment,
  mat_ohs_knee_ment
 } = info;
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





  return (
    <div className="flex flex-col h-full gap-4">
      {/* 상단 영역: 가로로 배치 */}
      <div className="flex gap-4">
        {/* 왼쪽 컴포넌트 */}
        <div className="flex-1">
          <SkeletonContainer data={info} />
        </div>

        {/* 오른쪽: 세로로 2개 */}
        <div className="flex flex-col flex-[2] gap-4">
          <div className="flex-1">
            <MeasureIntroTop 
              comment= {risk_upper_ment}
              condition={upperCondition}
              level={risk_upper_range_level}
            />
          </div>
          <div className="flex-1">
            <MeasureIntroBottom
              comment={risk_lower_ment}
              condition={lowerCondition}
              level={risk_lower_range_level}
            />
          </div>
        </div>
      </div>

      {/* 하단 영역: 이미지 및 텍스트 3개 가로 배치 */}
      <div className="flex border border-gray-200 rounded-xl gap-4">
        {/* 첫 번째 */}
        <div className="flex-1 p-4">
          <MeasureIntroFooter1 
            comment={"[좌우 무게 분석]\n" + mat_static_horizontal_ment + "\n[상하 무게 분석]\n" + mat_static_vertical_ment}
            condition={kneeCondition}
            level={mat_static_range_level}
            fileName={measure_server_mat_image_name}
            />
        </div>

        <div className="flex-1 p-4">
          <MeasureIntroFooter2 
            comment={"[좌우 무게 분석]\n" + mat_ohs_horizontal_ment + "\n[상하 무게 분석]\n" + mat_ohs_vertical_ment}
            footFileName={mat_hip_down_image_name}
            hipFileName={mat_hip_trajectory_name}
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
