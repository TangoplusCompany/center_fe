"use client";

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
interface FootStaticContainerProps {
  comment: string;
  condition: string;
  level: number;
  fileName: string;
  matStatics: IMatStaticPressure;
  lCase: 0 | 1;
}
const FootStaticContainer = (
  { 
    comment,
    condition,
    level,
    fileName,
    matStatics,
    lCase,
  }: FootStaticContainerProps
    
  ) => {
  

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
    const textTitleCondition = {
    정상: "text-secondary",
    주의: "text-warningDeep",
    위험: "text-dangerDeep",
  }[condition] ?? "bg-primary-foreground";
  
  return (
    <div className="flex-1 p-4">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl font-semibold ${textTitleCondition}`}>정적 족압</h2>
        <span className={`px-3 py-1 ${bgCondition} ${textCondition} rounded-xl text-xs`}>
          {condition} {level}단계
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
                <div className="flex flex-col items-center">
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
            <FootStatic fileName={fileName} matStatics={matStatics} />
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