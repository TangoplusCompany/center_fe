"use-client";

import { IUserMeasureDetailData } from "@/types/measure";

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
} : {
  data0: IUserMeasureDetailData | [IUserMeasureDetailData, IUserMeasureDetailData];
  data1?: IUserMeasureDetailData | [IUserMeasureDetailData, IUserMeasureDetailData];
}) => {
  const isArrayData0 = Array.isArray(data0);
  const data00 = isArrayData0 ? data0[0] : data0;
  const data01 = isArrayData0 && data0.length === 2 ? data0[1] : undefined;
  const formattedData00 = (data00.measure_unit?.includes("거리") ? Math.abs(data00.data) : data00.data).toFixed(1);
  const unit00 = data00.measure_unit?.includes("족압") 
    ? "%" 
    : data00.measure_unit?.includes("거리") 
      ? "cm" 
      : "°";
  const leftRightString00 = {
    0: "좌측",
    1: "우측"
  }[data00.left_right] ?? "";

  const seqString = {
    1 : "정면 측정",
    51 : "측면 측정",
    4 : "후면 측정",
    5 : "앉은 후면",
    6 : "팔꿉 측정",
    7 : "오버헤드 스쿼트"
  }[data00.measure_type] ?? "";
  const levelString00 = {
    0: "정상",
    1: "주의",
    2: "위험"
  }[data00.risk_level] ?? "정상";

  // data1용 변수들 (존재할 경우에만)
  const formattedData01 = data01?.measure_unit?.includes("거리") 
  ? Math.abs(data01.data).toFixed(1) 
  : data01?.data?.toFixed(1) ?? null;
  const unit01 = data01?.measure_unit?.includes("족압") 
    ? "%" 
    : data01?.measure_unit?.includes("거리") 
      ? "cm" 
      : "°";
  const leftRightString01 = data01 ? ({
    0: "좌측",
    1: "우측"
  }[data01.left_right] ?? "") : undefined;

  const levelString01 = data01 ? ({
    0: "정상",
    1: "주의",
    2: "위험"
  }[data01.risk_level] ?? "정상") : null;

  const textCondition00 = {
    정상: "text-sub600",
    주의: "text-warningDeep",
    위험: "text-dangerDeep",
  }[levelString00] ?? "bg-primary-foreground";
  const textLeftRightCondition00 = {
    정상: "text-sub600",
    주의: "text-white",
    위험: "text-white",
  }[levelString00] ?? "text-sub600";
  const textBgCondition00 = {
    정상: "bg-sub200/50",
    주의: "bg-warning",
    위험: "bg-danger",
  }[levelString00] ?? "bg-primary-foreground";

  const textCondition01 = {
    정상: "text-sub600",
    주의: "text-warningDeep",
    위험: "text-dangerDeep",
  }[levelString01 ?? "정상"] ?? "bg-primary-foreground";
  const textLeftRightCondition01 = {
    정상: "text-sub600",
    주의: "text-white",
    위험: "text-white",
  }[levelString01 ?? "정상"] ?? "text-sub600";
  const textBgCondition01 = {
    정상: "bg-sub200/50",
    주의: "bg-warning",
    위험: "bg-danger",
  }[levelString01 ?? "정상"] ?? "bg-primary-foreground";

  // 비교할 항목 2번
  const isArrayData1 = Array.isArray(data1);
  const data10 = isArrayData1 ? data1[0] : data1;
  const data11 = isArrayData1 && data1.length === 2 ? data1[1] : undefined;

  const formattedData10 = data10 
    ? (data10.measure_unit?.includes("거리") ? Math.abs(data10.data) : data10.data).toFixed(1)
    : null;

  const unit10 = data10?.measure_unit?.includes("족압") 
    ? "%" 
    : data10?.measure_unit?.includes("거리") 
      ? "cm" 
      : "°";

  const leftRightString10 = data10 
    ? ({
        0: "좌측",
        1: "우측"
      }[data10.left_right] ?? "")
    : "";

  const levelString10 = data10
    ? ({
        0: "정상",
        1: "주의",
        2: "위험"
      }[data10.risk_level] ?? "정상")
    : "정상";

  // data1용 변수들 (존재할 경우에만)
  const formattedData11 = data11?.measure_unit?.includes("거리") 
  ? Math.abs(data11.data).toFixed(1) 
  : data11?.data?.toFixed(1) ?? null;
  const unit11 = data11?.measure_unit?.includes("족압") 
    ? "%" 
    : data11?.measure_unit?.includes("거리") 
      ? "cm" 
      : "°";
  const leftRightString11 = data11 ? ({
    0: "좌측",
    1: "우측"
  }[data11.left_right] ?? "") : undefined;

  const levelString11 = data11 ? ({
    0: "정상",
    1: "주의",
    2: "위험"
  }[data11.risk_level] ?? "정상") : null;

  const textCondition10 = {
    정상: "text-sub600",
    주의: "text-warningDeep",
    위험: "text-dangerDeep",
  }[levelString10] ?? "bg-primary-foreground";
  const textLeftRightCondition10 = {
    정상: "text-sub600",
    주의: "text-white",
    위험: "text-white",
  }[levelString10] ?? "text-sub600";
  const textBgCondition10 = {
    정상: "bg-sub200/50",
    주의: "bg-warning",
    위험: "bg-danger",
  }[levelString10] ?? "bg-primary-foreground";

  const textCondition11 = {
    정상: "text-sub600",
    주의: "text-warningDeep",
    위험: "text-dangerDeep",
  }[levelString11 ?? "정상"] ?? "bg-primary-foreground";
  const textLeftRightCondition11 = {
    정상: "text-sub600",
    주의: "text-white",
    위험: "text-white",
  }[levelString11 ?? "정상"] ?? "text-sub600";
  const textBgCondition11 = {
    정상: "bg-sub200/50",
    주의: "bg-warning",
    위험: "bg-danger",
  }[levelString11 ?? "정상"] ?? "bg-primary-foreground";

  // const widths = [25, 55, 90];
  return (
    <div className={`flex flex-col`}>
      {/* 헤더 영역 */}
      <div className="flex order-t-2 border-b-2 border-sub100 px-4 py-2 bg-sub100 gap-4">
        <span className="text-sm font-semibold text-black">{data00.measure_unit}</span>
        <span className="text-sm font-semibold text-sub600">{seqString}</span>
      </div>

      <div className="grid grid-cols-[20_80%] ">
        <div>
          {/* 이곳에 비교일 떄 좌측 우측이 나옴 */}
        </div>

        <div className="flex flex-col">
          <div className="grid grid-cols-[7%_9%_9%_10%_65%] items-center border-b-2 border-sub200 ">
            <span />
            <span className="flex text-xs text-black bg-sub100 px-2 py-2 ">값</span>
            <span className={`flex justify-center text-xs bg-sub100 py-2 text-sub600`}>{!data01 ? '' : '좌우차이'}</span>
            <span className="flex justify-center text-xs text-sub600 bg-sub100 py-2 ">단계표시</span>
            <span className="text-xs text-sub600 bg-sub100 py-2 ">분석설명</span>
          </div>
          <div className="flex flex-col">

            {/* 왼쪽(상단) */}
            <div className={`grid grid-cols-[7%_18%_10%_65%] items-center h-full`}>
              <div className={`grid items-center h-full`}>
                <span className={`flex text-sm items-center justify-center text-sub600 px-2 py-1 rounded-full bg-sub100 mx-2 my-2 ${!data01 && 'invisible'}`}>
                  {leftRightString00}
                </span>
                {data01 && (
                  <span className={`text-sm flex items-center justify-center text-sub600 px-2 py-1 rounded-full bg-sub100 mx-2 my-2`}>
                    {leftRightString01}
                  </span>
                )}

                <span className={`flex text-sm items-center justify-center text-sub600 px-2 py-1 rounded-full bg-sub100 mx-2 my-2 ${!data11 && 'invisible'}`}>
                  {leftRightString10}
                </span>
                {data01 && (
                  <span className={`text-sm flex items-center justify-center text-sub600 px-2 py-1 rounded-full bg-sub100 mx-2 my-2`}>
                    {leftRightString11}
                  </span>
                )}

              </div>
              
              <div className={`grid items-center justify-start h-full`}>
                <span className={`flex items-center text-lg font-medium leading-none px-2`}>
                  {formattedData00} {unit00}
                </span>
                {data01 && (
                  <span className={`flex items-center text-lg font-medium leading-none px-2`}>
                    {formattedData01} {unit01}
                  </span>
                )}

                <span className={`flex items-center text-lg font-medium leading-none px-2`}>
                  {formattedData10} {unit10}
                </span>
                {data01 && (
                  <span className={`flex items-center text-lg font-medium leading-none px-2`}>
                    {formattedData11} {unit11}
                  </span>
                )}

              </div>

              {/* {(data01 && (
                <div className={`flex items-center gap-2 h-full`}>
                  <span className={`text-lg font-medium leading-none`}>
                    비교데이터
                  </span>
                </div>
              ))} */}


              <div className={`grid items-center justify-center h-full`}>
                <span className={`
                  flex inline-flex items-center justify-center mx-auto
                  px-2 py-1 ${textBgCondition00} ${textLeftRightCondition00} 
                  text-xs rounded-full
                `}>
                  {levelString00} {data00?.range_level}단계
                </span>
                {data01 && (
                  <span className={`
                    flex inline-flex items-center justify-center mx-auto
                    px-2 py-1 ${textBgCondition01} ${textLeftRightCondition01}
                    text-xs rounded-full
                  `}>
                    {levelString01} {data01?.range_level}단계
                  </span>
                )}

                <span className={`
                  flex inline-flex items-center justify-center mx-auto
                  px-2 py-1 ${textBgCondition10} ${textLeftRightCondition10} 
                  text-xs rounded-full
                `}>
                  {levelString10} {data10?.range_level}단계
                </span>
                {data01 && (
                  <span className={`
                    flex inline-flex items-center justify-center mx-auto
                    px-2 py-1 ${textBgCondition11} ${textLeftRightCondition11}
                    text-xs rounded-full
                  `}>
                    {levelString11} {data11?.range_level}단계
                  </span>
                )}
              </div>
              
              <div className={`grid items-center justify-start h-full`}>
                <span className={`${textCondition00} text-sm text-sub600`}>{data00.ment_all}</span>
                {data01 && (
                  <span className={`${textCondition01} text-sm text-sub600 `}>{data01?.ment_all}</span>
                )}

                <span className={`${textCondition10} text-sm text-sub600`}>{data10?.ment_all}</span>
                {data11 && (
                  <span className={`${textCondition11} text-sm text-sub600 `}>{data11?.ment_all}</span>
                )}

              </div>
              
            </div>
          </div>
        </div>
      </div>




      
    </div>
  );
}


export default CompareRawData;
