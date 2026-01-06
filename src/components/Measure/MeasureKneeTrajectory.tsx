"use client";

import { removeDarkBackground } from "@/utils/removeDarkBackground";
import { useEffect, useState } from "react";

const MeasureKneeTrajectory = (
  { 
    comment,
    leftKneeFileName,
    rightKneeFileName,
  }:
  {
    comment: string
    leftKneeFileName: string
    rightKneeFileName: string
  }) => {
    const baseUrl = `https://gym.tangoplus.co.kr/data/Results/`;
  const leftImageUrl = `${baseUrl}${leftKneeFileName}`;
  const rightImageUrl = `${baseUrl}${rightKneeFileName}`;
  const [processedLeftSrc, setProcessedLeftSrc] = useState<string>("");
  const [processedRightSrc, setProcessedRightSrc] = useState<string>("");
  useEffect(() => {
    removeDarkBackground(leftImageUrl)
      .then((result) => {
        setProcessedLeftSrc(result);
      })
      .catch(() => {
        setProcessedLeftSrc("/images/measure_default.png");
      });

    removeDarkBackground(rightImageUrl)
      .then((result) => setProcessedRightSrc(result))
      .catch(() => setProcessedRightSrc("/images/measure_default.png"));
  }, [leftImageUrl, rightImageUrl]);

  return (
    <div className="flex-1 p-4 bg-white">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">관절 이동</h3>
      </div>

      <div className="flex justify-center gap-4">
        <div className="flex justify-center mb-4">
          <div className="flex flex-col items-center w-fit">
            <div className="w-full rounded-md border text-center py-1 mb-1">
              무릎이동 궤적(L)
            </div>
            <div className="relative w-32 h-32">
              {processedLeftSrc !== "" && processedLeftSrc !== null && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={processedLeftSrc}
                  alt="왼쪽 무릎이동 궤적"
                  className="w-full h-full p-1 rounded-md border bg-accent"
                  onError={(e) => {
                    e.currentTarget.src = "/images/measure_default.png";
                  }}
                />
              )}
            </div>
          </div>
      </div>
      
      <div className="flex justify-center mb-4">
        <div className="flex flex-col items-center w-fit">
          <div className="w-full rounded-md border text-center py-1 mb-1">
            무릎이동 궤적(R)
          </div>
          <div className="relative w-32 h-32">
            {processedRightSrc !== "" && processedRightSrc !== null && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={processedRightSrc}
                  alt="오른쪽 무릎이동 궤적"
                  className="w-full h-full p-1 rounded-md border bg-accent"
                  onError={(e) => {
                    e.currentTarget.src = "/images/measure_default.png";
                  }}
                />
              )}
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

export default MeasureKneeTrajectory;
