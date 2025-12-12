import React, { useState, useEffect } from "react";
import SkeletonBack from "./SkeletonBack";
import SkeletonFront from "./SkeletonFront";
import { IUserDetailMeasureInfo } from "@/types/user";

const SkeletonBox = ({ data }: { data: IUserDetailMeasureInfo }) => {
  const [view, setView] = useState("front");
  const [viewState] = useState(true);

  useEffect(() => {
    if (viewState) {
      setView("front");
    } else {
      setView("back");
    }
  }, [viewState]);
  return (
    <div className="relative box-border flex h-full flex-col items-center rounded-3xl border border-stroke bg-gray p-6 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">

      {/* 회전 버튼 */}
      {/* <button
        className="absolute right-3 top-3 z-10"
        title="앞/뒤 보기"
        onClick={viewStateHandle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          className="spin_animation"
        >
          <path
            fill="currentColor"
            d="M4 20v-2h2.75l-.4-.35q-1.225-1.225-1.787-2.662T4 12.05q0-2.775 1.663-4.937T10 4.25v2.1Q8.2 7 7.1 8.563T6 12.05q0 1.125.425 2.188T7.75 16.2l.25.25V14h2v6zm10-.25v-2.1q1.8-.65 2.9-2.212T18 11.95q0-1.125-.425-2.187T16.25 7.8L16 7.55V10h-2V4h6v2h-2.75l.4.35q1.225 1.225 1.788 2.663T20 11.95q0 2.775-1.662 4.938T14 19.75"
          />
        </svg>
      </button> */}

      <div className="flex-1 flex items-center justify-center">
        <div className="relative z-0 skeleton mb-8">
          <SkeletonFront
            className={`${view === "front" ? "on_view" : "off_view"} h-full w-full`}
            data={data}
          />
          <SkeletonBack
            className={`${view === "back" ? "on_view" : "off_view"} h-full w-full`}
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
