"use-client";

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


export const RawDataResult = (
  {
    data,
    isCompare
  } : 
  {
    data: IStaticRawDataProps | [IStaticRawDataProps, IStaticRawDataProps];
    isCompare: 0 | 1;
  }
) => {
  const isArrayData = Array.isArray(data);
  const data0 = isArrayData ? data[0] : data;
  const data1 = isArrayData && data.length === 2 ? data[1] : undefined;
  
  // data0용 변수들
  const formattedData0 = data0.data.toFixed(1);
  const unit0 = data0.measure_unit?.includes("족압") 
    ? "%" 
    : data0.measure_unit?.includes("거리") 
      ? "cm" 
      : "°";
  const leftRightString0 = {
    0: "좌측",
    1: "우측"
  }[data0.left_right] ?? "";

  console.log(data0.risk_level, leftRightString0, formattedData0, unit0)

  const seqString = {
    1 : "정면 측정",
    51 : "측면 측정",
    4 : "후면 측정",
    5 : "앉은 후면",
    6 : "팔꿉 측정",
    7 : "오버헤드 스쿼트"
  }[data0.measure_type] ?? "";
  const levelString0 = {
    0: "정상",
    1: "주의",
    2: "위험"
  }[data0.risk_level] ?? "정상";

  // data1용 변수들 (존재할 경우에만)
  const formattedData1 = data1 ? data1.data.toFixed(1) : null;
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
  


  // const borderCondition = {
  //   정상: "border-sub300/50",
  //   주의: "border-[#FFE8CD]",
  //   위험: "border-[#FFD1D1]",
  // }[levelString] ?? "bg-primary-foreground";
  // const bgCondition = {
  //   정상: "bg-gradient-to-b from-[#eeeeee]/50 from-[4%] to-white to-[50%]",
  //   주의: "bg-gradient-to-b from-[#FFA73A]/10 from-[4%] to-white to-[50%]",
  //   위험: "bg-gradient-to-b from-[#FF5252]/10 from-[2%] to-white to-[50%]",
  // }[levelString] ?? "bg-primary-foreground";

  // const barCondition = {
  //   정상: "bg-gradient-to-r from-[#eeeeee]/50 from-[0%] to-[#eeeeee]/100 to-[100%]",
  //   주의: "bg-gradient-to-r from-[#FFA73A]/10 from-[0%] to-[#FFA73A]/100 to-[100%]",
  //   위험: "bg-gradient-to-r from-[#ff5252]/10 from-[0%] to-[#ff5252]/100 to-[100%]",
  // }[levelString] ?? "bg-primary-foreground";


  // const textTitleCondition = {
  //   정상: "text-secondary",
  //   주의: "text-warningDeep",
  //   위험: "text-dangerDeep",
  // }[levelString] ?? "bg-primary-foreground";

  const textCondition0 = {
    정상: "text-sub600",
    주의: "text-warningDeep",
    위험: "text-dangerDeep",
  }[levelString0] ?? "bg-primary-foreground";
  const textLeftRightCondition0 = {
    정상: "text-sub600",
    주의: "text-white",
    위험: "text-white",
  }[levelString0] ?? "text-sub600";
  const textBgCondition0 = {
    정상: "bg-sub200/50",
    주의: "bg-warning",
    위험: "bg-danger",
  }[levelString0] ?? "bg-primary-foreground";

  const textCondition1 = {
    정상: "text-sub600",
    주의: "text-warningDeep",
    위험: "text-dangerDeep",
  }[levelString1 ?? "정상"] ?? "bg-primary-foreground";
  const textLeftRightCondition1 = {
    정상: "text-sub600",
    주의: "text-white",
    위험: "text-white",
  }[levelString1 ?? "정상"] ?? "text-sub600";
  const textBgCondition1 = {
    정상: "bg-sub200/50",
    주의: "bg-warning",
    위험: "bg-danger",
  }[levelString1 ?? "정상"] ?? "bg-primary-foreground";

  // const widths = [25, 55, 90];
  return (
    <div className={`flex flex-col`}>
      {/* 헤더 영역 */}
      <div className="flex order-t-2 border-b-2 border-sub200 px-2 py-2 bg-sub100 gap-4">
        <span className="text-sm font-semibold text-black">{data0.measure_unit}</span>
        <span className="text-sm font-semibold text-sub600">{seqString}</span>
      </div>

      {/* 데이터 영역 - 좌측만 */}
      {isCompare === 1 ? (
        // 비교하는 곳
        <div className="flex items-center gap-4">
          <span className="text-sm text-sub600 w-12">{leftRightString0}</span>
          <span className="text-lg font-medium">{formattedData0} {unit0}</span>
          <span className={`
            inline-flex items-center justify-center mx-auto
            px-3 py-1 ${textBgCondition0} ${textLeftRightCondition0} 
            text-xs rounded-full
          `}>
            {levelString0} {data0?.range_level}단계
          </span>
          <span>{data0.ment_all}</span>
        </div>
      ) : (
        // MeasureDetail
        <div className="grid grid-cols-2 gap-4">


          <div className="grid grid-cols-[25%_15%_60%] items-center gap-2 h-full">
            <div className="flex flex-col items-center justify-center h-full w-full">
              <span className="text-sm text-sub600 self-start px-2 py-1 rounded-full bg-sub100 mx-2 my-2">
                {leftRightString0}
              </span>
              <span className="text-lg font-medium leading-none pb-6">
                {formattedData0} {unit0}
              </span>
            </div>
            
            <span className={`
              inline-flex items-center justify-center mx-auto
              px-2 py-1 ${textBgCondition0} ${textLeftRightCondition0} 
              text-xs rounded-full
            `}>
              {levelString0} {data0?.range_level}단계
            </span>
            <span className={`${textCondition0} text-sm text-sub600`}>{data0.ment_all}</span>
          </div>

          <div className={`grid grid-cols-[25%_15%_60%] items-center gap-2 h-full ${!data1 && 'invisible'}`}>
            <div className="flex flex-col items-center justify-center h-full w-full">
              <span className="text-sm text-sub600 self-start px-2 py-1 rounded-full bg-sub100 mx-2 my-2">
                {leftRightString1}
              </span>
              <span className="text-lg font-medium leading-none pb-6">
                {formattedData1} {unit1}
              </span>
            </div>
            
            <span className={`
              inline-flex items-center justify-center mx-auto
              px-2 py-1 ${textBgCondition1} ${textLeftRightCondition1} 
              text-xs rounded-full
            `}>
              {levelString1} {data1?.range_level}단계
            </span>
            <span className={`${textCondition1} text-sm text-sub600`}>{data1?.ment_all}</span>
          </div>
        </div>
      )}
    </div>
  );
}


export default RawDataResult;
