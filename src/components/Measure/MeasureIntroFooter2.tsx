"use client";

import { removeBlackBackground } from "@/utils/removeBlackBackground";
import { useEffect, useState } from "react";

export interface IMatOhsPressure {
  leftTopPressure: number;
  leftBottomPressure: number;
  rightTopPressure: number;
  rightBottomPressure: number;
  leftPressure: number;
  rightPressure: number;
  topPressure: number;
  bottomPressure: number;
}

const MeasureIntroFooter2 = (
  { 
    comment,
    footFileName,
    hipFileName,
    matOhs
  }:
  {
    comment: string
    footFileName: string
    hipFileName: string
    matOhs: IMatOhsPressure
  }) => {
    const baseUrl = `https://gym.tangoplus.co.kr/data/Results/`;
  const footImageUrl = `${baseUrl}${footFileName}`;
  const hipImageUrl = `${baseUrl}${hipFileName}`;
  const [processedFootSrc, setProcessedFootSrc] = useState<string>("");
  const [processedHipSrc, setProcessedHipSrc] = useState<string>("");
  useEffect(() => {
    console.log("footImageUrl =", footImageUrl);

    removeBlackBackground(footImageUrl)
      .then((result) => {
        console.log("converted foot image =", result);
        setProcessedFootSrc(result);
      })
      .catch((err) => {
        console.error("removeBlackBackground foot failed:", err);
        setProcessedFootSrc("/images/measure_default.png");
      });

    removeBlackBackground(hipImageUrl)
      .then((result) => setProcessedHipSrc(result))
      .catch(() => setProcessedHipSrc("/images/measure_default.png"));
  }, [footImageUrl, hipImageUrl]);
  return (
    <div className="flex-1 p-4 bg-white">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">동적 족압, 관절 이동</h3>
      </div>

      <div className="flex justify-center gap-4 mb-4">

        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center w-fit">
            <div className="w-full rounded-md border text-center py-1 mb-1">
              동적 족압 분석
            </div>
            <div className="relative w-32 h-32">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={processedFootSrc}
                alt="동적 족압 이미지"
                className="w-full h-full p-1 rounded-md border bg-accent"
                onError={(e) => {
                  e.currentTarget.src = "/images/measure_default.png";
                }}
              />
              <div className="absolute top-1/2 left-[40%] w-1/5 h-[1px] bg-sub300 -translate-y-1/2" />
              <div className="absolute left-1/2 top-[40%] h-1/5 w-[1px] bg-sub300 -translate-x-1/2" />


              {/* 상단 */}
              <span className="absolute top-1 left-1/2 -translate-x-1/2 text-sub400 text-sm font-semibold">
                {matOhs.topPressure}%
              </span>

              {/* 좌측 */}
              <span className="absolute top-1/2 left-1 -translate-y-1/2 text-sub400 text-sm font-semibold">
                {matOhs.leftPressure}%
              </span>

              {/* 우측 */}
              <span className="absolute top-1/2 right-1 -translate-y-1/2 text-sub400 text-sm font-semibold">
                {matOhs.rightPressure}%
              </span>

              {/* 하단 */}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-sub400 text-sm font-semibold">
                {matOhs.bottomPressure}%
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center w-fit">
            <div className="w-full rounded-md border text-center py-1 mb-1">
              골반 이동 분석
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={processedHipSrc}
              alt="골반 궤적 이미지"
              className="w-32 h-32 p-1 rounded-md border bg-accent"
              onError={(e) => (e.currentTarget.src = '/images/measure_default.png')}
            />
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

export default MeasureIntroFooter2;
