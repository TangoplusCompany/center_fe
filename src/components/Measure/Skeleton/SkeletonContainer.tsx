"use client";

import { IMeasureInfo } from "@/types/measure";
import React from "react";

import { FullBodySkeleton3D } from "../FullBodySkeleton3D";
import { useTranslations } from "next-intl";
// import UnitySkeleton from "./UnitySkeleton";
// import { useTheme } from "next-themes";



const SkeletonContainer = ({ 
  data,
}: {
  data:  IMeasureInfo;
}) => {
  const t = useTranslations("Index")

  return (
    <div className="relative box-border flex h-full flex-col items-center rounded-3xl border-2 border-sub200 p-4 text-black focus-visible:outline-none">
      
      

      <div className="flex-1 flex items-center justify-center w-full min-h-0">
        <div className="relative z-0 skeleton mb-8 w-full max-w-[260px] aspect-[246/440] min-h-[150px]">
          <FullBodySkeleton3D data={data} className="w-full h-full" />
        </div>
      </div>
      {/* <div className="flex-1 flex items-center justify-center w-full min-h-0 my-4">
        <div className="relative items-center justify-center skeleton w-full max-w-[512px] " >
          <UnitySkeleton  joints={transformRiskToJoints(data)} isDarkMode={isDarkMode} />
        </div>
      </div> */}
     
      {/* ⭐ 기준바: Skeleton 하단 중앙 */}
      <div className="hidden md:flex flex-col w-full gap-2">        
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-sub400" >
            * 측정 기준 설명
          </p>
          <p className="text-sm text-sub400">
            Polyon Studio (CC BY)
          </p>
        </div>
        

        {/* 상단 3단 바 */}
        <div className="flex overflow-hidden rounded-md mx-auto w-full" style={{ borderColor: "#E5E5E5" }}>
          <div className="flex-1 py-1 text-center font-semibold" style={{ backgroundColor: "#F5F5F5", color: "#555555" }}>
            {t('grade_normal')}
          </div>
          <div className="flex-1 py-1 text-center font-semibold" style={{ backgroundColor: "#F5DDC3", color: "#B5741A" }}>
            {t('grade_caution')}
          </div>
          <div className="flex-1 py-1 text-center font-semibold" style={{ backgroundColor: "#C77C82", color: "#81363D" }}>
            {t('grade_danger')}
          </div>
        </div>

        {/* 하단 설명 - 수정된 부분 */}
        <div className="flex text-sm mt-3"> {/* justify-between 대신 flex만 사용 */}
          {/* 정상 - 1/3 너비 및 중앙 정렬 */}
          <div className="flex-1 text-center">
            <span style={{ color: "#9A9A9A" }}>{t('grade_normal_desc')}</span>
          </div>

          {/* 주의 - 1/3 너비 및 중앙 정렬 */}
          <div className="flex-1 text-center">
            <span style={{ color: "#B5741A" }}>{t('grade_caution_desc_0')}<br />{t('grade_caution_desc_1')}</span>
          </div>

          {/* 위험 - 1/3 너비 및 중앙 정렬 */}
          <div className="flex-1 text-center">
            <span style={{ color: "#81363D" }}>{t('grade_danger_desc')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonContainer;
