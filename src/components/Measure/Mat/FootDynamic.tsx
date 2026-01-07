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

export interface FootDynamicProps {
  comment: string
  footFileName: string
  hipFileName: string
  matOhs: IMatOhsPressure
  lCase: 0 | 1;
}


const FootDynamic = (
{ 
  comment,
  footFileName,
  matOhs,
  lCase,
}: FootDynamicProps
) => {
  const baseUrl = process.env.NEXT_PUBLIC_FILE_URL || '';
  const footImageUrl = `${baseUrl}/${footFileName}`;
  const [processedFootSrc, setProcessedFootSrc] = useState<string>("");

  useEffect(() => {
    removeBlackBackground(footImageUrl)
      .then((result) => {
        setProcessedFootSrc(result);
      })
      .catch(() => {
        // console.error("removeBlackBackground foot failed:", err);
        setProcessedFootSrc("/images/measure_default.png");
      });
  }, [footImageUrl]);

  return (
    <div className="flex-1 p-4">
      {/* 헤더 */}
      {lCase === 0 ? (
        <>
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
                  
                  {processedFootSrc !== "" && processedFootSrc !== null && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={processedFootSrc}
                      alt="동적 족압 분석"
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
{/* 
            <div className="flex justify-center items-center">
              <HipTrajectory hipFileName={hipFileName} />
            </div> */}
          </div>
            {/* 코멘트 */}
          <div className="text-base text-gray-700 whitespace-pre-line">
            {comment}
          </div>
        </>
      ) : (
        // 새로운 레이아웃 (isDetailStatic === 1)
        <div className="grid grid-cols-2 gap-6">
          {/* 왼쪽: 이미지 */}
          <div className="flex flex-col items-center">
            <div className="flex justify-between items-center mb-4 w-full">
              <div className="w-full rounded-md border text-center py-1 mb-1">
                동적 족압 분석
              </div>
            </div>


            <div className="relative w-32 h-32">
              {processedFootSrc !== "" && processedFootSrc !== null && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={processedFootSrc}
                  alt="동적 족압 분석"
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

          {/* 오른쪽: 코멘트 */}
          <div className="flex items-center text-base text-gray-700 whitespace-pre-line">
            {comment}
          </div>
        </div>
      )}
    </div>
  );
}

export default FootDynamic;
