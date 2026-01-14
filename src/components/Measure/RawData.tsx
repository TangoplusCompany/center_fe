"use-client";

import { IUserMeasureDetailData } from "@/types/measure";

export const RawData = (
  {
    data,
  } : 
  {
    data: IUserMeasureDetailData | [IUserMeasureDetailData, IUserMeasureDetailData];
  }
) => {
  const isArrayData = Array.isArray(data);
  const data0 = isArrayData ? data[0] : data;
  const data1 = isArrayData && data.length === 2 ? data[1] : undefined;
  
  // data0용 변수들
  const formattedData0 = (data0.measure_unit?.includes("거리") ? Math.abs(data0.data) : data0.data).toFixed(1);
  const unit0 = data0.measure_unit?.includes("족압") 
    ? "%" 
    : data0.measure_unit?.includes("거리") 
      ? "cm" 
      : "°";
  const leftRightString0 = {
    0: "좌측",
    1: "우측"
  }[data0.left_right] ?? "";

  const levelString0 = {
    0: "정상",
    1: "주의",
    2: "위험"
  }[data0.risk_level] ?? "정상";

  // data1용 변수들 (존재할 경우에만)
  const formattedData1 = data1?.measure_unit?.includes("거리") 
  ? Math.abs(data1.data).toFixed(1) 
  : data1?.data?.toFixed(1) ?? null;
  const unit1 = data1?.measure_unit?.includes("족압") 
    ? "%" 
    : data1?.measure_unit?.includes("거리") 
      ? "cm" 
      : "°";
  const leftRightString1 = data1 ? ({
    0: "좌측",
    1: "우측"
  }[data1.left_right] ?? "") : undefined;

  const levelString1 = data1 ? ({
    0: "정상",
    1: "주의",
    2: "위험"
  }[data1.risk_level] ?? "정상") : null;

  const textCondition0 = {
    정상: "text-sub600",
    주의: "text-warningDeep",
    위험: "text-dangerDeep",
  }[levelString0] ?? "bg-primary-foreground";
  const textBgCondition0 = {
    정상: "bg-sub600",
    주의: "bg-warning",
    위험: "bg-danger",
  }[levelString0] ?? "bg-primary-foreground";

  const textCondition1 = {
    정상: "text-sub600",
    주의: "text-warningDeep",
    위험: "text-dangerDeep",
  }[levelString1 ?? "정상"] ?? "bg-primary-foreground";
  const textBgCondition1 = {
    정상: "bg-sub600",
    주의: "bg-warning",
    위험: "bg-danger",
  }[levelString1 ?? "정상"] ?? "bg-primary-foreground";
  const getStandard = (unit: string | undefined) => {
    if (unit?.includes("기울기")) return "0°";
    if (unit?.includes("족압 분포-상하")) return "40%/60%";
    if (unit?.includes("족압 분포-좌우")) return "50%/50%";
    return ".";
  };
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-[18%_10%_12%_60%] items-center border-b-2 border-sub200 bg-sub100 py-2">
        <span className="text-base font-semibold text-black px-4">{data0.measure_unit}</span>
        <span className={`flex flex-1 justify-center text-base text-sub600 `}>{!data1 ? '' : '기준값'}</span>
        <span className="flex justify-center text-base text-sub600 ">단계표시</span>
        <span className="text-base text-sub600 px-4">분석설명</span>
      </div>

      <div className="flex flex-col">

        {/* 왼쪽(상단) */}
        <div className={`grid grid-cols-[18%_10%_12%_60%] items-center h-full divide-x-2 divide-sub200`}>
          
          <div className={`grid items-center h-full ${data1 && 'divide-y-2 divide-sub200'}`}>
            <div className="flex justify-center">
              <span className={`flex text-xs items-center justify-center text-sub600 px-2 py-1 rounded-full bg-sub100 my-3 ${!data1 && 'invisible'}`}>
                {leftRightString0}
              </span>
              <span className={`flex items-center text-xl leading-none mx-2`}>
                {formattedData0} {unit0}
              </span>
            </div>
            <div className="flex justify-center">
              {data1 && (
                <span className={`flex text-xs flex items-center justify-center text-sub600 px-2 py-1 rounded-full bg-sub100 my-2 `}>
                  {leftRightString1}
                </span>
              )}
              {data1 && (
                <span className={`flex items-center text-xl leading-none mx-2 `}>
                  {formattedData1} {unit1}
                </span>
              )}
            </div>
          </div>
          
          <div className={`flex items-center justify-center w-full h-full`}>
            <span className={`flex text-sm font-medium leading-none`}>
              {getStandard(data0.measure_unit)}
            </span>
          </div>    



          <div className={`grid items-center h-full relative`}>
            <span className={`
              flex inline-flex items-center justify-center mx-auto
              px-2 py-1 ${textBgCondition0} text-white
              text-xs rounded-full
            `}>
              {levelString0} {data0?.range_level}단계
            </span>
            {data1 && (
              <span className={`
                flex inline-flex items-center justify-center mx-auto
                px-2 py-1 ${textBgCondition1} text-white
                text-xs rounded-full
              `}>
                {levelString1} {data1?.range_level}단계
              </span>
            )}
            {data1 && (
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-sub200 -translate-y-1/2" />
            )}
          </div>
          
          <div className={`grid items-center justify-start w-full h-full relative`}>
            {data1 && data0.ment_all === data1.ment_all ? (
              // 두 내용이 같으면 하나만 표시 (구분선 없음)
              <div className="text-base text-sub600 px-3 place-self-center">
                {data0.ment_all}
              </div>
            ) : (
              // 두 내용이 다르거나 data1이 없으면 기존 로직
              <>
                <div className={`${textCondition0} text-base text-sub600 px-3`}>
                  {data0.ment_all}
                </div>
                {data1 && (
                  <div className={`${textCondition1} text-base text-sub600 px-3`}>
                    {data1.ment_all}
                  </div>
                )}
                {/* 정중앙 구분선 */}
                {data1 && (
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-sub200 -translate-y-1/2" />
                )}
              </>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}


export default RawData;
