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
    data
  } : 
  {
    data: IStaticRawDataProps
  }
) => {
  const formattedData = data.data.toFixed(1);
  const unit = data.measure_unit?.includes("거리") ? "cm" : "°";
  const leftRightString = {
    0: "좌측",
    1: "우측"
  }[data.left_right] ?? ""
  const seqString = {
    1 : "정면 측정",
    51 : "측면 측정",
    4 : "후면 측정",
    5 : "앉은 후면",
    6 : "팔꿉 측정",
    7 : "오버헤드 스쿼트"
  }[data.measure_type] ?? ""

  const levelstring = {
    0: "정상",
    1: "주의",
    2: "위험"
  }[data.risk_level] ?? "정상";

  const borderCondition = {
    정상: "border-sub300/50",
    주의: "border-[#FFE8CD]",
    위험: "border-[#FFD1D1]",
  }[levelstring] ?? "bg-primary-foreground";
  const bgCondition = {
    정상: "bg-gradient-to-b from-[#eeeeee]/50 from-[4%] to-white to-[50%]",
    주의: "bg-gradient-to-b from-[#FFA73A]/10 from-[4%] to-white to-[50%]",
    위험: "bg-gradient-to-b from-[#FF5252]/10 from-[2%] to-white to-[50%]",
  }[levelstring] ?? "bg-primary-foreground";

  const barCondition = {
    정상: "bg-gradient-to-r from-[#eeeeee]/50 from-[0%] to-[#eeeeee]/100 to-[100%]",
    주의: "bg-gradient-to-r from-[#FFA73A]/10 from-[0%] to-[#FFA73A]/100 to-[100%]",
    위험: "bg-gradient-to-r from-[#ff5252]/10 from-[0%] to-[#ff5252]/100 to-[100%]",
  }[levelstring] ?? "bg-primary-foreground";


  const textTitleCondition = {
    정상: "text-secondary",
    주의: "text-warningDeep",
    위험: "text-dangerDeep",
  }[levelstring] ?? "bg-primary-foreground";

  const textCondition = {
    정상: "text-sub600",
    주의: "text-warningDeep",
    위험: "text-dangerDeep",
  }[levelstring] ?? "bg-primary-foreground";
  const textLeftRightCondition = {
    정상: "text-sub600",
    주의: "text-white",
    위험: "text-white",
  }[levelstring] ?? "text-sub600";
  const textBgCondition = {
    정상: "bg-sub200/50",
    주의: "bg-warning",
    위험: "bg-danger",
  }[levelstring] ?? "bg-primary-foreground";

  return (
    <div className={`flex flex-col rounded-3xl border-2 ${borderCondition} ${bgCondition} shadow-[inset_0_2px_4px_rgba(255,255,255,0.25)]`}>
      
      <div className="grid grid-cols-[3fr,1fr,3fr] flex-1">

        <div className="flex flex-col">
          <div className="flex justify-between items-center px-2">
            <h2 className={`text-base font-semibold px-2 py-2 ${textCondition}`}>{seqString}</h2>
            <span
              className={`
                inline-flex items-center gap-1.5
                px-3 py-1 whitespace-nowrap flex-shrink-0
                ${textBgCondition}
                ${textLeftRightCondition} text-xs rounded-full
              `}
            >
              {leftRightString}
            </span>
          </div>
          <div className="flex flex-col justify-center px-4 py-2">
            <div className={`text-base ${textTitleCondition}`}>{data.measure_unit}</div>
          </div>
        </div>
        {/* 점수 */}
        <div className={`flex items-center justify-center border-l-2 border-r-2 ${borderCondition}`}>
          {formattedData}{unit}
        </div>

        {/* 그래프 */}
        <div className="relative h-full grid grid-rows-[1fr_2fr]">
          {/* 배경 그리드 (3등분 + 점선) - 1fr */}
          <div className="grid grid-cols-3 w-full">
            <div className={`border-r-2 border-dashed ${borderCondition} flex items-center justify-center`}>
              <span className={`text-xs ${textCondition} font-semibold`}>정상</span>
            </div>
            <div className={`border-r-2 border-dashed ${borderCondition} flex items-center justify-center`}>
              <span className={`text-xs ${textCondition} font-semibold`}>주의</span>
            </div>
            <div className="flex items-center justify-center">
              <span className={`text-xs ${textCondition} font-semibold`}>위험</span>
            </div>
          </div>
          
          {/* 레벨 바 영역 - 2fr */}
          <div className="relative grid grid-cols-3">
            {/* 배경 점선 */}
            <div className={`border-r-2 border-dashed ${borderCondition}`}></div>
            <div className={`border-r-2 border-dashed ${borderCondition}`}></div>
            <div></div>
            
            {/* 레벨 바 */}
            <div className="absolute inset-0 flex items-center">
              <div 
                className={`h-6 rounded-r-lg transition-all border-t-2 border-b-2 border-r-2 ${barCondition} ${borderCondition} flex justify-center items-center `}
                style={{ 
                  width: `${(data.risk_level + 1) * 25}%`
                }}
              >
                <span className={`text-xs font-bold ${textCondition}`}>
                  {data.range_level}단계
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>



      
      <div className={`flex items-center gap-3 border-t-2 ${borderCondition} h-[60px]`}>
        <div className="flex items-center px-4 py-3">
          <div className={`w-1 h-4 ${textBgCondition} rounded-full flex-shrink-0`}></div>
          <div className={`text-sm text-secondary px-2 ${textCondition} line-clamp-2`}>
            {data.ment_all}
          </div>
        </div>
      </div>
    </div>
  );
}


export default RawDataResult;
