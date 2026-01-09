import React from "react";
import SkeletonSvg from "./SkeletonSvg";
import { IUserDetailMeasureInfo } from "@/types/measure";

const SkeletonBox = ({ data }: { data: IUserDetailMeasureInfo }) => {
  



  return (
    <div className="relative box-border flex h-full flex-col items-center rounded-3xl border border border-sub300 bg-gray p-4 text-black focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
      <div className="flex-1 flex items-center justify-center">
        <div className="relative z-0 skeleton mb-8">
          <SkeletonSvg
            
            data={data}
          />
        </div>
      </div>

      {/* ⭐ 기준바: Skeleton 하단 중앙 */}
      <div className="w-full max-w-xl mx-auto text-center mt-auto">
        <div className="flex items-start">
          <p className="text-sm mb-2" style={{ color: "#9A9A9A" }}>
            * 측정 기준 설명
          </p>
        </div>
        

        {/* 상단 3단 바 */}
        <div className="flex overflow-hidden rounded-md mx-auto" style={{ borderColor: "#E5E5E5" }}>
          <div className="flex-1 py-1 text-center font-semibold" style={{ backgroundColor: "#F5F5F5", color: "#555555" }}>
            정상
          </div>
          <div className="flex-1 py-1 text-center font-semibold" style={{ backgroundColor: "#F5DDC3", color: "#B5741A" }}>
            주의
          </div
  >
          <div className="flex-1 py-1 text-center font-semibold" style={{ backgroundColor: "#C77C82", color: "#81363D" }}>
            위험
          </div>
        </div>

        {/* 하단 설명 - 수정된 부분 */}
        <div className="flex text-sm mt-3"> {/* justify-between 대신 flex만 사용 */}
          {/* 정상 - 1/3 너비 및 중앙 정렬 */}
          <div className="flex-1 text-center">
            <span style={{ color: "#9A9A9A" }}>상태 유지 강화 권장</span>
          </div>

          {/* 주의 - 1/3 너비 및 중앙 정렬 */}
          <div className="flex-1 text-center">
            <span style={{ color: "#B5741A" }}>제공되는 맨몸 운동 권장</span>
          </div>

          {/* 위험 - 1/3 너비 및 중앙 정렬 */}
          <div className="flex-1 text-center">
            <span style={{ color: "#81363D" }}>전문가 상담 권장</span>
          </div>
        </div>
      </div>
    </div>
  );

};

export default SkeletonBox;
