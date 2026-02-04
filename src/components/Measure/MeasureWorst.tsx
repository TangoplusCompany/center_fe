"use client";

import { TWorstPart } from "@/types/dashboard";


const MeasureWorst = ({ data }: { data: TWorstPart }) => {

  const imageSrc = {
    "목": "img_neck_2.svg",
    "어깨": "img_shoulder_2.svg",
    "팔꿉": "img_elbow_2.svg",
    "골반": "img_hip_2.svg",
    "무릎": "img_knee_2.svg",
    "발목": "img_ankle_2.svg"
  }[data.partName]

  return (
    <div className="flex flex-col h-full w-full rounded-3xl border-2 border-sub200 dark:border-border shadow-none bg-white dark:bg-muted relative overflow-hidden">
      {/* 배경 이미지 - 제일 뒤로 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 right-0 w-48 h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/images/${imageSrc}`}
            alt=""
            className="w-full h-full object-cover object-bottom"
          />
        </div>
      </div>

      {/* 제목 - 좌상단 작은 원 배지와 함께 */}
      <div className="flex flex-shrink-0 items-center gap-2 mb-4 p-5 relative z-10">
        {/* TODO 이곳에 아이콘 넣기 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/icons/ic_arrow_315_circle.svg`}
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <h2 className="text-xl font-bold text-black dark:text-foreground">가장 취약 부위</h2>
      </div>

      {/* 왼쪽 내용 */}
      <div className="flex flex-col justify-end flex-1 space-y-3 p-5 mb-6 relative  z-10">
        {/* 위험 레벨 배지 */}
        <div className={`w-fit px-3 py-1 ${
          data.level === 2 ? "bg-danger" : "bg-warning"
        } text-white text-lg font-semibold rounded-xl`}>
          {data.partName}
        </div>

        {/* 설명 박스 */}
        <div className={`w-fit ${data.level === 2 ? "bg-danger-foreground" : "bg-warning-foreground"
        } rounded-lg p-4`}>
          <p className={`text-base ${
            data.level === 2 ? "text-danger dark:text-black" : "text-warning dark:text-black"
          } leading-relaxed`}>
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MeasureWorst;