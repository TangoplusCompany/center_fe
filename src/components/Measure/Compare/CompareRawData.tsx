"use-client";

import { IUserMeasureDetailData } from "@/types/measure";
import { compareTrendState } from "@/utils/compareTrendState";
import { getRawDataMark } from "@/utils/getRawDataMark";
import { getRiskScore } from "@/utils/getRiskScore";

export interface IStaticRawDataProps {
  measure_type: number;
  landmark: number;
  data: number;
  risk_level: number;
  range_level: number;
  measure_unit: string | null;
  ment_all: string; // 왼쪽: 오른쪽:
  ment: string;
  left_right: number;
}


export const CompareRawData = ({
  data0,
  data1,
  measure_date0,
  measure_date1,
} : {
  data0: IUserMeasureDetailData | [IUserMeasureDetailData, IUserMeasureDetailData];
  data1?: IUserMeasureDetailData | [IUserMeasureDetailData, IUserMeasureDetailData];
  measure_date0: string;
  measure_date1: string;
}) => {

  const isArrayDataTop0 = Array.isArray(data0);
  const dataTop0 = isArrayDataTop0 ? data0[0] : data0;
  const dataBottom0 = isArrayDataTop0 && data0.length === 2 ? data0[1] : undefined;
  const unit = getRawDataMark(dataTop0?.measure_unit);
  const rawData00 = dataTop0?.measure_unit?.includes("거리") 
    ? Math.abs(dataTop0?.data) 
    : dataTop0?.data;
  const rawData01 = dataBottom0?.measure_unit?.includes("거리")
    ? Math.abs(dataBottom0.data)
    : (dataBottom0?.data ?? 0);

  const isArrayDataTop1 = Array.isArray(data1);
  const dataTop1 = isArrayDataTop1 ? data1[0] : data1;
  const dataBottom1 = isArrayDataTop1 && data1.length === 2 ? data1[1] : undefined;
  const rawData10 = dataTop1?.measure_unit?.includes("거리")
    ? Math.abs(dataTop1.data)
    : (dataTop1?.data ?? 0);
  const rawData11 = dataBottom1?.measure_unit?.includes("거리")
    ? Math.abs(dataBottom1.data)
    : (dataBottom1?.data ?? 0);

  const trendGap0 = Math.abs(rawData00 - rawData10)?.toFixed(1) + unit
  const trendGap1 = Math.abs(rawData01 - rawData11)?.toFixed(1) + unit

  const RawDataContainer = (
    dataTop: IUserMeasureDetailData,
    dataBottom: IUserMeasureDetailData | undefined,
    isNext: boolean
  ) => {
    const formattedData0 = (dataTop?.measure_unit?.includes("거리") ? Math.abs(dataTop?.data) : dataTop?.data)?.toFixed(1);
    const unit0 = getRawDataMark(dataTop?.measure_unit)
    const leftRightString0 = {
      0: "좌측",
      1: "우측"
    }[dataTop?.left_right] ?? "";
    
    const levelString0 = {
      0: "정상",
      1: "주의",
      2: "위험"
    }[dataTop?.risk_level] ?? "정상";


    const formattedData1 = dataBottom?.measure_unit?.includes("거리") 
    ? Math.abs(dataBottom.data)?.toFixed(1) 
    : dataBottom?.data?.toFixed(1) ?? undefined;
    const unit1 = getRawDataMark(dataBottom?.measure_unit)
    const leftRightString1 = dataBottom ? ({
      0: "좌측",
      1: "우측"
    }[dataBottom?.left_right] ?? "") : undefined;

    const levelString1 = dataBottom ? ({
      0: "정상",
      1: "주의",
      2: "위험"
    }[dataBottom?.risk_level] ?? "정상") : undefined;

    const textBgCondition0 = {
      정상: "bg-sub600",
      주의: "bg-warning",
      위험: "bg-danger",
    }[levelString0] ?? "bg-sub600";

    const textBgCondition1 = {
      정상: "bg-sub600",
      주의: "bg-warning",
      위험: "bg-danger",
    }[levelString1 ?? "정상"] ?? "bg-sub600";

    const data0 = dataTop?.measure_unit?.includes("거리") 
      ? Math.abs(dataTop?.data) 
      : dataTop?.data;
      
    const data1 = dataBottom?.measure_unit?.includes("거리")
      ? Math.abs(dataBottom.data)
      : (dataBottom?.data ?? 0);

    
    
    return (
    <div  className={`flex flex-col w-full h-full`}>
      <div className="grid grid-cols-[18%_10%_12%_60%] items-center border-b-2 border-sub200 bg-sub100 py-2">
        <div className="flex gap-4 items-center pl-4">
          <span className="text-lg font-semibold text-black ">{isNext ? '②' : '①'}</span>
          <span className="text-base text-sub600">{isNext ? measure_date1.slice(0, 11) : measure_date0.slice(0, 11)}</span>
        </div>
        <span className={`flex flex-1 justify-center text-base text-sub600 `}>{!dataBottom ? '기준값' : '차이값'}</span>
        <span className="flex justify-center text-base text-sub600 ">단계표시</span>
        <span className="text-base text-sub600 px-4">분석설명</span>
      </div>

      <div  className={`grid grid-cols-[18%_10%_12%_60%] items-center h-full w-full divide-x-2 divide-sub200`}>
        
        <div className={`grid items-center h-full`}>
          <div className="flex">
            <span className={`flex text-sm items-center justify-center ${isNext ? 'text-black' : 'text-sub600'} px-2 py-1 rounded-full bg-sub100 mx-2 my-2 ${!dataBottom && 'invisible'}`}>
              {leftRightString0}
            </span>
            <span className={`flex items-center text-lg font-medium leading-none px-2 ${isNext ? 'text-black' : 'text-sub600'}`}>
              {formattedData0} {unit0}
            </span>
          </div>
          {dataBottom && (
            <div className="flex">
              <span className={`text-sm flex items-center justify-center ${isNext ? 'text-black' : 'text-sub600'} px-2 py-1 rounded-full bg-sub100 mx-2 my-2`}>
                {leftRightString1}
              </span>
              <span className={`flex items-center text-lg text-black font-medium leading-none px-2 ${isNext ? 'text-black' : 'text-sub600'}`}>
                {formattedData1} {unit1}
              </span>
            </div>
          )}
        </div>  


        <div className={`grid items-center justify-center h-full ${isNext ? 'text-black' : 'text-sub600'}`}>
          {!dataBottom 
            ? (dataTop?.measure_unit?.includes("기울기") ? "0º" : "")
            : (data0 - data1).toFixed(1) + unit0
          }
        </div>

        <div className={`grid items-center justify-center h-full`}>
          <span className={`
            flex inline-flex items-center justify-center mx-auto
            px-2 py-1 ${textBgCondition0} 
            text-sm rounded-full text-white
          `}>
            {levelString0} {dataTop?.range_level}단계
          </span>
          {dataBottom && (
            <span className={`
              flex inline-flex items-center justify-center mx-auto
              px-2 py-1 ${textBgCondition1}
              text-sm rounded-full text-white
            `}>
              {levelString1} {dataBottom?.range_level}단계
            </span>
          )}
        </div>

        <div className={`grid items-center justify-start h-full px-4`}>
          <span className={`text-base ${isNext ? 'text-black' : 'text-sub600'}`}>
            {dataTop?.ment_all}
          </span>
          {dataBottom && dataBottom.ment_all !== dataTop?.ment_all && (
            <span className={`text-base ${isNext ? 'text-black' : 'text-sub600'}`}>
              {dataBottom.ment_all}
            </span>
          )}
        </div>
      </div>
    </div>
  )};
  
  const scoreTop0 = getRiskScore(`${dataTop0?.risk_level}`, `${dataTop0?.range_level}`);
  const scoreTop1 = dataTop1 ? getRiskScore(`${dataTop1?.risk_level}`, `${dataTop1?.range_level}`) : 0;
  const scoreBottom0 = dataBottom0 ? getRiskScore(`${dataBottom0.risk_level}`, `${dataBottom0?.range_level}`) : 0;
  const scoreBottom1 = dataBottom1 ? getRiskScore(`${dataBottom1.risk_level}`, `${dataBottom1?.range_level}`) : 0;
  const trendArrow0 = scoreTop1 === undefined ? "-" : 
    scoreTop1 < scoreTop0 ? "▲" :  // 점수가 낮아짐 = 좋아짐
    scoreTop1 > scoreTop0 ? "▼" :  // 점수가 높아짐 = 나빠짐
    "-";
  const trendArrow1 = scoreBottom1 === undefined ? "-" : 
    scoreBottom1 < scoreBottom0 ? "▲" :  // 점수가 낮아짐 = 좋아짐
    scoreBottom1 > scoreBottom0 ? "▼" :  // 점수가 높아짐 = 나빠짐
    "-";
  const trendCount0 = compareTrendState(scoreTop0, scoreTop1);
  const trendCount1 = compareTrendState(scoreBottom0, scoreBottom1);

  const trendBgCondition0 = dataTop1 ? {
    "0": "bg-sub100",
    "1": "bg-warning-foreground",
    "2": "bg-danger-foreground",
  }[dataTop1.risk_level] ?? "bg-sub300" : "bg-sub100";
  const trendTextCondition0 = dataTop1 ? {
    "0": "text-sub600",
    "1": "text-warningDeep",
    "2": "text-dangerDeep",
  }[dataTop1.risk_level] ?? "text-sub600" : "text-sub600";
  const trendBorderCondition0 = dataTop1 ? {
    "0": "border-2 border-sub600",
    "1": "border-2 border-warningDeep",
    "2": "border-2 border-dangerDeep",
  }[dataTop1.risk_level] ?? "border-2 border-sub600" : "border-2 border-sub600";

  const trendBgCondition1 = dataBottom1 ? {
    "0": "bg-sub100",
    "1": "bg-warning-foreground",
    "2": "bg-danger-foreground",
  }[dataBottom1.risk_level] ?? "bg-sub300" : "bg-sub100";
  const trendTextCondition1 = dataBottom1 ? {
    "0": "text-sub600",
    "1": "text-warningDeep",
    "2": "text-dangerDeep",
  }[dataBottom1.risk_level] ?? "text-sub600" : "text-sub600";
  const trendBorderCondition1 = dataBottom1 ? {
    "0": "border-2 border-sub600",
    "1": "border-2 border-warningDeep",
    "2": "border-2 border-dangerDeep",
  }[dataBottom1.risk_level] ?? "border-2 border-sub600" : "border-2 border-sub600";
  
  const existedSlot = data1 !== undefined && dataTop1 !== undefined
  const isLeftRightData = dataTop1 && dataBottom1
  return (
    <div className="w-full table table-fixed min-w-0 overflow-hidden">
      <div className="flex flex-col overflow-x-auto overflow-y-hidden w-full min-w-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* 헤더 영역 */}
        <div className="flex border-b-2 border-sub200 px-4 py-2 bg-sub100 gap-4 min-w-[1000px]">
          <span className="text-xl font-semibold text-black">{dataTop0?.measure_unit ?? ""}</span>
        </div>

        <div className="grid grid-cols-[20%_80%] h-full w-full min-w-[1000px]">
        <div className="flex flex-col h-full border-r-2 border-sub200 w-full">
          <div className={isLeftRightData ? "grid grid-cols-2 bg-sub200 py-2" : "flex w-full  justify-center items-center bg-sub200 py-2"}>
            <div className="flex justify-center items-center text-base text-sub600 py-[3px]">{isLeftRightData ? "좌측" : "비교차이"}</div>
            {isLeftRightData && <div className="flex justify-center items-center text-base text-sub600">우측</div>}
          </div>
                    
          <div className={isLeftRightData ? "grid grid-cols-2 items-center justify-center h-full w-full" : "grid h-full w-full"}>
            <div className={`flex flex-col items-center justify-center gap-2 h-full bg-sub100 py-2`}>
              <div className={`text-xl font-bold whitespace-nowrap ${trendTextCondition0} ${!existedSlot && 'invisible'}`}>{trendArrow0}</div>
              <div className={`text-xl font-bold whitespace-nowrap ${trendTextCondition0} ${!existedSlot && 'invisible'}`}>{trendGap0}</div>
              <div 
                className={`
                ${trendBgCondition0} 
                ${trendBorderCondition0} 
                ${trendTextCondition0}
                 rounded-full px-3 py-1 text-sm whitespace-nowrap 
                 ${!existedSlot && 'invisible'}`}
              >
                {trendCount0}
              </div>
            </div>
            {isLeftRightData && (
              <div className={`flex flex-col items-center justify-center gap-2 px-8 h-full bg-sub100 py-2`}>
                <div className={`text-xl font-bold whitespace-nowrap ${trendTextCondition1}`}>{trendArrow1}</div>
                <div className={`text-xl font-bold whitespace-nowrap ${trendTextCondition1}`}>{trendGap1}</div>
                <div 
                  className={`
                  ${trendBgCondition1}
                  ${trendBorderCondition1} 
                  ${trendTextCondition1} 
                  rounded-full px-3 py-1 text-sm whitespace-nowrap`}
                >
                  {trendCount1}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          {RawDataContainer(dataTop0, dataBottom0 , false)}
          {existedSlot && RawDataContainer(dataTop1, dataBottom1 , true)}
        </div>
      </div>
      </div>
    </div>
  );
}

export default CompareRawData;
