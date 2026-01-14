import { getCompareTrendState } from "@/utils/compareTrendState";
import { formatText } from "@/utils/formatSummary";
import { getRiskScore } from "@/utils/useRiskScore";


export interface CompareSummaryUnitProps {
  ment: string;
  risk_level: string;
  range_level: string;
  measure_date: string;
}

const CompareSummaryUnit = ({
  summaryUnit0,
  summaryUnit1,
  title,
} : {
  summaryUnit0: CompareSummaryUnitProps;
  summaryUnit1?: CompareSummaryUnitProps;
  title: string;
}) => {
  const getRiskString = (level?: number | string) => {
    if (level === undefined || level === null) return undefined; 
    const numLevel = Number(level);
    if (numLevel >= 2) return "위험";
    if (numLevel >= 1) return "주의";
    return "정상";
  };

  const riskString1 = getRiskString(summaryUnit1?.risk_level) ?? " ";

  const trendBgCondition = summaryUnit1 ? {
    "0": "bg-sub100",
    "1": "bg-warning-foreground",
    "2": "bg-danger-foreground",
  }[summaryUnit1.risk_level] ?? "bg-sub300" : "bg-sub100";
  const trendTextCondition = summaryUnit1 ? {
    "0": "text-sub600",
    "1": "text-warningDeep",
    "2": "text-dangerDeep",
  }[summaryUnit1.risk_level] ?? "text-sub600" : "text-sub600";

  const trendBorderCondition = summaryUnit1 ? {
    "0": "border-2 border-sub600",
    "1": "border-2 border-warningDeep",
    "2": "border-2 border-dangerDeep",
  }[summaryUnit1.risk_level] ?? "" : "";

  const score0 = getRiskScore(summaryUnit0.risk_level, summaryUnit0.range_level);
  const score1 = summaryUnit1 ? getRiskScore(summaryUnit1.risk_level, summaryUnit1.range_level) : undefined;
  const trendArrow = score1 === undefined ? " " : 
    score1 < score0 ? "▲" :  // 점수가 낮아짐 = 좋아짐
    score1 > score0 ? "▼" :  // 점수가 높아짐 = 나빠짐
    " ";
  const trendString = riskString1 === " " ? " " : riskString1 + " " + summaryUnit1?.range_level + "단계"
  
  const trendCount = getCompareTrendState(score0, score1);

  const summaryMent = (summaryUnit: CompareSummaryUnitProps, isNext: boolean) => {
    const riskString = getRiskString(summaryUnit.risk_level);
    
    const textCondition0 = {
      "0": "text-secondary",
      "1": "text-white",
      "2": "text-white",
    }[summaryUnit.risk_level] ?? "text-secondary";
    
    const textBgCondition0 = {
      "0": "bg-sub300",
      "1": "bg-warning",
      "2": "bg-danger",
    }[summaryUnit.risk_level] ?? "bg-sub300";
    
    return (
      <div className="flex-1">
        <div className="flex items-center justify-between border-b-2 border-sub200 px-4 py-1 bg-sub100">
          <div className="flex gap-4 items-center">
            <span className="text-base">{isNext ? '②' : '①'}</span>
            <span className={`text-xs ${isNext ? 'text-black' : 'text-sub600'}`}>{summaryUnit.measure_date.slice(0, 11)}</span>
          </div>
          <span className={`${textBgCondition0} ${textCondition0} text-xs px-2 py-1 rounded-full`}>{riskString} {summaryUnit.range_level}단계</span>
        </div>
        <div className={`flex items-center justify-start text-sm ${isNext ? 'text-black' : 'text-sub600'} px-4 py-2 whitespace-pre-line`}>{formatText(summaryUnit.ment)}</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col ">
      {/* 타이틀 */}
      <div className="bg-sub100 text-base font-semibold text-black px-4 py-2 border-t-2 border-b-2 border-sub200">
        {title}
      </div>

      {/* 2개의 카드 영역 */}
      <div className="flex">
        {/* 이전 카드 */}
        <div className={`flex flex-col w-[20%] items-center justify-center gap-2 px-8 ${trendBgCondition}`}>
          <div className={`text-2xl font-bold whitespace-nowrap ${trendTextCondition}`}>{trendArrow}</div>
          <div className={`text-2xl font-bold whitespace-nowrap ${trendTextCondition}`}>{trendString}</div>
          <div className={`${trendBgCondition} ${trendBorderCondition} ${trendTextCondition} rounded-full px-3 py-1 text-sm whitespace-nowrap`}>{trendCount}</div>
        </div>

        <div className="grid grid-raws-2 w-[80%]">
          {summaryMent(summaryUnit0, false)}
          {summaryUnit1 && (
            summaryMent(summaryUnit1, true)
          )}
        </div>
      </div>
    </div>
  );
};

export default CompareSummaryUnit;