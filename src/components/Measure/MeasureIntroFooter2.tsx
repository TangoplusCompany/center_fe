"use client";

import { removeBlackBackground } from "@/utils/transparentBackground";
import { useEffect, useState } from "react";

const MeasureIntroFooter2 = (
  { 
    comment,
    footFileName,
    hipFileName,
  }:
  {
    comment: string
    footFileName: string
    hipFileName: string
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={processedFootSrc}
          alt="정적 족압 이미지"
          className="w-32 h-32"
          onError={(e) => (e.currentTarget.src = '/images/measure_default.png')}
        />
      </div>

      <div className="flex justify-center items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={processedHipSrc}
          alt="정적 족압 이미지"
          className="w-32 h-32"
          onError={(e) => (e.currentTarget.src = '/images/measure_default.png')}
        />
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
