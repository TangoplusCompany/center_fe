import { cn } from "@/lib/utils";
import { GaitContainerProps } from "./Container"

export interface GaitInfoCardProps {
  type: string//"Pattern" | "Balance" | "Efficiency"
  title: string;
  description ?: string;
  grade: number;
}
export function GaitInfoHorizonCard({ type, title,  grade } : GaitInfoCardProps) {
  const borderColor = {
    0 : " border-sub200",
    1 : "border-warning",
    2: "border-danger"
  } [grade];
  const textColor = {
    0 : "text-sub750",
    1 : "text-warning",
    2: "text-danger"
  } [grade];
  const typeTitle = {
    "Pattern" : "보행 패턴",
    "Balance" : "동적 균형",
    "Efficiency": "보행 효율"
  } [type];
  return (
    <div className={`flex flex-col p-2 rounded-xl items-center border ${borderColor}`}>
      <div className={` text-xs sm:text-sm `}>{typeTitle}</div>
      <div className={`text-sm sm:text-base ${textColor}`}>{title}</div>
    </div>
  )
}

export function GaitInfoVertiCard({ type, description, grade } : GaitInfoCardProps) {

  const textBg = {
    0: "bg-sub600 dark:bg-gray-600",
    1: "bg-warning",
    2: "bg-danger",
  } [grade];
  const typeTitle = {
    "TotalComment" : "종합 요약",
    "Rhythm" : "리듬 및 속도",
    "FallRisk": "자세 및 낙상 지표",
    "RecommendComment": "추천"
  } [type];

  const gradeTitle = {
    0 : "정상",
    1 : "주의",
    2: "위험",
  } [grade];

  return (
    <div className={`flex flex-col gap-2 `}>
      <div className="flex w-full justify-between">
        <div className={` text-sm sm:text-base font-semibold`}>{typeTitle}</div>
        <div className={cn(
          "px-3 py-1 rounded-full text-xs text-white text-center whitespace-normal break-keep",
          textBg,
        )}>{gradeTitle}</div>
      </div>
      <div className={`text-sm sm:text-base text-sub700`}>{description}</div>
    </div>
  )
}



export default function GaitInfo({data}: GaitContainerProps) {

  const infoHorizonCards = [
    {
      type: "Pattern",
      title: data.resultGaitPatternTitle,
      description: data.resultGaitPatternDescription,
      grade: data.resultGaitPatternGrade
    },
    {
      type: "Balance",
      title: data.resultGaitBalanceTitle,
      description: data.resultGaitBalanceDescription,
      grade: data.resultGaitBalanceGrade
    },
    {
      type: "Efficiency",
      title: data.resultGaitEfficiencyTitle,
      description: data.resultGaitEfficiencyDescription,
      grade: data.resultGaitEfficiencyGrade
    }
  ]

  const infoVertiCards = [
    {
      type: "TotalComment",
      title: data.resultGaitTotalCommentTitle,
      description: data.resultGaitTotalCommentDescription,
      grade: data.resultGaitTotalCommentGrade
    },
    {
      type: "Rhythm",
      title: data.resultGaitRhythmTitle,
      description: data.resultGaitRhythmDescription,
      grade: data.resultGaitRhythmGrade
    },
    {
      type: "FallRisk",
      title: data.resultFallRiskTitle,
      description: data.resultFallRiskDescription,
      grade: data.resultFallRiskGrade
    },
    {
      type: "RecommendComment",
      title: data.resultRecommendCommentTitle,
      description: data.resultRecommendCommentDescription,
      grade: data.resultRecommendCommentGrade
    }
  ]
  return (
    <div className="flex flex-col rounded-3xl border-2 border-sub200 p-4">
      <div className="text-lg font-semibold mb-2 text-sub700">
        전체 보행 결과 
      </div>
      <div className="flex items-center gap-2 ">
        <div className="w-3 h-3 rounded-sm bg-mainBlue-600" />
        <div className="text-mainBlue-600 text-sm sm:text-base font-bold ">
          보행 패턴
        </div>
      </div>
      <div className="relative w-full text-center font-semibold text-sub700 text-base sm:text-lg py-2">{data.resultGaitTypeTitle}</div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {infoHorizonCards.map((card, id) => (
          <GaitInfoHorizonCard key={id} type={card.type} title={card.title} grade={card.grade} />
        ))}
      </div>


      <div className="flex items-center gap-2 ">
        <div className="w-3 h-3 rounded-sm bg-mainBlue-600" />
        <div className="text-mainBlue-600 text-sm sm:text-base font-bold ">
          설명
        </div>
      </div>
      <div className="grid grid-rows-4 h-full gap-2 mt-4">
         {infoVertiCards.map((card, id) => (
            <GaitInfoVertiCard key={id} type={card.type} title={card.title} description={card.description} grade={card.grade} />
          ))}
      </div>
    </div>
  )
};