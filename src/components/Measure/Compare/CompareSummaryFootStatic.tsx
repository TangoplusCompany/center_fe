import { getRiskString } from "@/components/Util/RiskLevel";
import { IMatStaticPressure } from "../Mat/FootStaticContainer";

export interface CompareSummaryFootStaticProps {
  comment: string;
  risk_level: string;
  range_level: string;
  fileName: string;
  matStatics: IMatStaticPressure;
  measure_date: string;
}


const CompareSummaryFootStatic = ({
  static0,
  static1,
} : {
  static0: CompareSummaryFootStaticProps;
  static1?: CompareSummaryFootStaticProps;
}) => {
  console.log(static0.risk_level, static0.range_level)
  const riskString1 = getRiskString(static1?.risk_level) ?? "-";
  const getRiskScore = (riskLevel: string | undefined) => {
    if (!riskLevel) return 0;
    const [major, minor] = riskLevel.split('-').map(Number);
    return major * 3 + minor + 1;
  }
  const score0 = getRiskScore(static0.risk_level);
  const score1 = static1 ? getRiskScore(static1.risk_level) : undefined;
  const trendArrow = score1 === undefined ? "-" : 
    score1 < score0 ? "▲" :  // 점수가 낮아짐 = 좋아짐
    score1 > score0 ? "▼" :  // 점수가 높아짐 = 나빠짐
    "-";
  const trendString = riskString1 === "-" ? "-" : riskString1 + static1?.range_level + "단계"
  

  const getTrendText = () => {
    if (!static1 || score1 === undefined) return "";
    const diff = score0 - score1;
    if (diff > 0) return `${diff}단계 완화`;
    if (diff < 0) return `${Math.abs(diff)}단계 악화`;
    return "변화 없음";
  };

  const trendCount = getTrendText();
  const trendBgCondition = static1 ? {
    "0": "bg-sub300",
    "1": "bg-warning-foreground",
    "2": "bg-danger-foreground",
  }[static1.risk_level] ?? "bg-sub300" : undefined;
  const trendTextCondition = static1 ? {
    "0": "bg-sub300",
    "1": "bg-warning-deep",
    "2": "bg-danger-deep",
  }[static1.risk_level] ?? "bg-sub300" : undefined;

  const summaryMent = (footStatic: CompareSummaryFootStaticProps, isNext: boolean) => {
    const riskString = getRiskString(footStatic.risk_level);
    
    const textCondition0 = {
      "0": "text-secondary",
      "1": "text-white",
      "2": "text-white",
    }[footStatic.risk_level] ?? "text-secondary";
    
    const textBgCondition0 = {
      "0": "bg-sub300",
      "1": "bg-warning",
      "2": "bg-danger",
    }[footStatic.risk_level] ?? "bg-sub300";

    
    return (
      <div className="flex-1">
        <div className="flex items-center justify-between border-b-2 border-sub200 px-4 py-1 bg-sub100">
          <div className="flex gap-4">
            <span className="text-sm">{isNext ? '최신' : '이전'}</span>
            <span className="text-sm text-gray-600">{footStatic.measure_date.slice(0, 11)}</span>
          </div>
          <span className={`${textBgCondition0} ${textCondition0} text-xs px-2 py-1 rounded-full`}>{riskString} {footStatic.range_level}단계</span>
        </div>

        <div className="flex flex-col ">


        </div>



        <div className="text-sm text-sub600 px-4 py-2 whitespace-pre-line">{footStatic.comment}</div>
      </div>
    );
  };



  return (
    <div className="flex flex-col ">
      {/* 상지요약 타이틀 */}
      <div className="bg-sub100 text-lg text-black px-4 py-2 border-t-2 border-b-2 border-sub200">
        정면 족압
      </div>

      {/* 2개의 카드 영역 */}
      <div className="flex">
        {/* 이전 카드 */}
        <div className={`flex flex-col w-[20%] items-center justify-center gap-2 px-8 ${trendBgCondition}`}>
          <div className={`text-2xl font-bold whitespace-nowrap ${trendTextCondition}`}>{trendArrow}</div>
          <div className={`text-2xl font-bold whitespace-nowrap ${trendTextCondition}`}>{trendString}</div>
          <div className="bg-white rounded-full px-3 py-1 text-sm whitespace-nowrap">{trendCount}</div>
        </div>

        <div className="grid grid-raws-2 w-[80%]">
          {summaryMent(static0, false)}
          {static1 && (
            summaryMent(static1, true)
          )}
        </div>
      </div>
    </div>
  );
};


export default CompareSummaryFootStatic;