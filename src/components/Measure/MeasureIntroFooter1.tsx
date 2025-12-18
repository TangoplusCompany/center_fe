"use client";

import { removeBlackBackground } from "@/utils/removeBlackBackground";
import { useEffect, useState } from "react";

export interface IMatStaticPressure {
  leftTopPressure: number;
  leftBottomPressure: number;
  rightTopPressure: number;
  rightBottomPressure: number;
  leftPressure: number;
  rightPressure: number;
  topPressure: number;
  bottomPressure: number;
}

const MeasureIntroFooter1 = (
  { 
    comment,
    condition,
    level,
    fileName,
    matStatics,
  }:
  {
    comment: string
    condition: string
    level: number
    fileName: string
    matStatics: IMatStaticPressure
  }) => {
  
  // 또는 환경변수에서 가져오기
  const baseUrl = `https://gym.tangoplus.co.kr/data/Results/`;
  const imageUrl = `${baseUrl}${fileName}`;
  const [processedImageSrc, setProcessedImageSrc] = useState<string>("");

  const bgCondition = {
    정상: "bg-sub600",
    주의: "bg-warning",
    위험: "bg-danger",
  }[condition] ?? "bg-[#7E7E7E]";
    const textCondition = {
    정상: "text-white",
    주의: "text-warning-foreground",
    위험: "text-danger-foreground",
  }[condition] ?? "bg-[#7E7E7E]";
  useEffect(() => {
      

      removeBlackBackground(imageUrl)
        .then((result) => {
          setProcessedImageSrc(result);
        })
        .catch(() => {
          setProcessedImageSrc("/images/measure_default.png");
        });
    }, [imageUrl]);
  return (
    <div className="flex-1 p-4 bg-white">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">정적 족압</h2>
        <span className={`px-3 py-1 ${bgCondition} ${textCondition} rounded-xl text-xs`}>
          {condition} {level}단계
        </span>
      </div>

      <div className="flex justify-center gap-4">
        <div className="flex justify-center mb-4">
          <div className="flex flex-col items-center w-fit">
            <div className="w-full rounded-md border text-center py-1 mb-1 invisible">
              무릎이동 궤적(L)
            </div>
            <div className="relative w-32 h-32">
              {processedImageSrc !== "" && processedImageSrc !== null && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={processedImageSrc}
                  alt="정적 족압 이미지"
                  className="w-full h-full p-1 rounded-md border bg-accent"
                  onError={(e) => {
                    e.currentTarget.src = "/images/measure_default.png";
                  }}
                />
              )}
              <div className="absolute top-1/2 left-[40%] w-1/5 h-[1px] bg-sub300 -translate-y-1/2" />
              <div className="absolute left-1/2 top-[40%] h-1/5 w-[1px] bg-sub300 -translate-x-1/2" />

              {/* 상단 */}
              <span className="absolute top-1 left-1/2 -translate-x-1/2 text-sub400 text-sm font-semibold">
                {matStatics.topPressure}%
              </span>

              {/* 좌측 */}
              <span className="absolute top-1/2 left-1 -translate-y-1/2 text-sub400 text-sm font-semibold">
                {matStatics.leftPressure}%
              </span>

              {/* 우측 */}
              <span className="absolute top-1/2 right-1 -translate-y-1/2 text-sub400 text-sm font-semibold">
                {matStatics.rightPressure}%
              </span>

              {/* 하단 */}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-sub400 text-sm font-semibold">
                {matStatics.bottomPressure}%
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* 코멘트 */}
      <div className="text-base text-gray-700 whitespace-pre-line">
        {comment}
      </div>
    </div>
  );
}

export default MeasureIntroFooter1;