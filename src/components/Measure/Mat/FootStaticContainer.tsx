"use client";

import { getRiskString } from "@/utils/RiskLevel";
import FootStatic from "./FootStatic";

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
export interface FootStaticContainerProps {
  comment: string;
  risk_level: string;
  range_level: string;
  fileName: string;
  matStatics: IMatStaticPressure;
  lCase: 0 | 1; // lcase(layoutCase) : 이미지+설명의 레이아웃 
  // 0: MeasureIntro의 Top-Down | 1: Static0~6의 Left-Right 
}
const FootStaticContainer = ({ 
    comment,
    risk_level,
    range_level,
    fileName,
    matStatics,
    lCase,
}: FootStaticContainerProps) => {
  const riskString = getRiskString(risk_level)
  const bgCondition = {
    0: "bg-sub600",
    1: "bg-warning",
    2: "bg-danger",
  }[risk_level] ?? "bg-[#7E7E7E]";
  //   const textCondition = {
  //   0: "text-white",
  //   1: "text-warning-foreground",
  //   2: "text-danger-foreground",
  // }[risk_level] ?? "bg-[#7E7E7E]";
    const textTitleCondition = {
    0: "text-secondary",
    1: "text-warningDeep",
    2: "text-dangerDeep",
  }[risk_level] ?? "bg-primary-foreground";
  
  return (
    <div className="flex-1 p-4">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl font-semibold ${lCase === 0 ? 'text-black': textTitleCondition}`}>정적 족압</h2>
        <span className={`px-3 py-1 ${bgCondition} text-white rounded-xl text-xs`}>
          {riskString} {range_level}단계
        </span>
      </div>
      {lCase === 0 ? (
        <>
          <div className="flex justify-center gap-4">
            <div className="flex justify-center mb-4">
              <div className="flex flex-col items-center w-fit">
                <div className="w-full rounded-md border text-center py-1 mb-1 invisible">
                  가려진 타이틀
                </div>
                <div className="flex flex-col items-center w-32 h-32">
                  <FootStatic fileName={fileName} matStatics={matStatics} />
                </div>
              </div>
            </div>
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
            <div className="flex flex-col items-center w-32 h-32">
              <FootStatic fileName={fileName} matStatics={matStatics} />
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

export default FootStaticContainer;