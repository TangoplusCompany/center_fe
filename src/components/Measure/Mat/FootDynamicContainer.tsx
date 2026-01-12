"use client";

import FootDynamic from "./FootDynamic";
import HipTrajectory from "./HipTrajectory";

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

export interface FootDynamicContainerProps {
  comment: string
  footFileName: string
  hipFileName: string
  matOhs: IMatOhsPressure
  lCase: 0 | 1;
}

const FootDynamicContainer = (
{ 
  comment,
  footFileName,
  hipFileName,
  matOhs,
  lCase,
}: FootDynamicContainerProps
) => {
  
  return (
    <div className="flex-1 p-4">
      {/* 헤더 */}
      {lCase === 0 ? (
        <>
          {/* 헤더 */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">동적 족압, 관절 이동</h3>
            </div>

            <div className="flex justify-center gap-4">

              <div className="flex justify-center items-center">
                <div className="flex flex-col items-center w-fit">
                  <div className="w-full rounded-md border text-center py-1 mb-1">
                    동적 족압 분석
                  </div>
                  <div className="w-32 h-32">
                    <FootDynamic footFileName={footFileName} matOhs={matOhs} />
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <div className="flex justify-center items-center">
                  <div className="flex flex-col items-center w-fit">
                    <div className="w-full rounded-md border text-center py-1 mb-1">
                      골반 이동 분석
                    </div>
                    <div className="w-32 h-32">
                      <HipTrajectory hipFileName={hipFileName} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
              {/* 코멘트 */}
            <div className="text-base text-gray-700 whitespace-pre-line">
              {comment}
            </div>
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
            <FootDynamic footFileName={footFileName} matOhs={matOhs} />
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

export default FootDynamicContainer;
