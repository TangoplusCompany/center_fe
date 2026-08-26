import { cn } from "@/lib/utils";
import { GaitContainerProps } from "./Container"
import { useTranslations } from "next-intl";

export interface GaitInfoCardProps {
  type: string//"Pattern" | "Balance" | "Efficiency"
  title ?: string;
  description ?: string;
  grade: number;
}
export function GaitInfoHorizonCard({ type, title,  grade } : GaitInfoCardProps) {
  const t= useTranslations("Index")
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
    "Pattern" : "gait_pattern",
    "Balance" : "gait_dynamic_balance",
    "Efficiency": "gait_efficiency"
  } [type];
  return (
    <div className={`flex flex-col p-2 rounded-xl items-center border ${borderColor}`}>
      <div className={` text-xs sm:text-sm `}>{t(typeTitle ?? "")}</div>
      <div className={`text-sm sm:text-base ${textColor}`}>{title}</div>
    </div>
  )
}

export function GaitInfoVertiCard({ type, description, grade } : GaitInfoCardProps) {
  const t = useTranslations("Index")
  const textBg = {
    0: "bg-sub600 dark:bg-gray-600",
    1: "bg-warning",
    2: "bg-danger",
  } [grade];
  const typeTitle = {
    "TotalComment" : "summary_comprehensive",
    "Rhythm" : "gait_rhythm_speed",
    "FallRisk": "gait_posture_fall_risk",
    "RecommendComment": "label_recommendation"
  } [type];

  const gradeTitle = {
    0 : "status_normal",
    1 : "status_caution",
    2: "status_danger",
  } [grade];

  return (
    <div className={`flex flex-col gap-2 `}>
      <div className="flex w-full justify-between">
        <div className={` text-sm sm:text-base font-semibold`}>{t(typeTitle ?? "")}</div>
        <div className={cn(
          "px-3 py-1 rounded-full text-xs text-white text-center whitespace-normal break-keep",
          textBg,
        )}>{t(gradeTitle ?? "")}</div>
      </div>
      <div className={`text-sm sm:text-base text-sub700`}>{description}</div>
    </div>
  )
}



export default function GaitInfo({data}: GaitContainerProps) {
  const t = useTranslations("Index")
  const iData = data.gait_measure_info
  const infoHorizonCards = [
    {
      type: "Pattern",
      title: iData.resultGaitPatternDescription,
      description: iData.resultGaitPatternDescription,
      grade: iData.resultGaitPatternGrade
    },
    {
      type: "Balance",
      title: iData.resultGaitBalanceDescription,
      description: iData.resultGaitBalanceDescription,
      grade: iData.resultGaitBalanceGrade
    },
    {
      type: "Efficiency",
      title: iData.resultGaitEfficiencyDescription,
      description: iData.resultGaitEfficiencyDescription,
      grade: iData.resultGaitEfficiencyGrade
    }
  ]

  const infoVertiCards = [
    {
      type: "TotalComment",
      description: iData.resultGaitTotalCommentDescription,
      grade: iData.resultGaitTotalCommentGrade
    },
    {
      type: "Rhythm",
      description: iData.resultGaitRhythmDescription,
      grade: iData.resultGaitRhythmGrade
    },
    {
      type: "FallRisk",
      description: iData.resultFallRiskDescription,
      grade: iData.resultFallRiskGrade
    },
    {
      type: "RecommendComment",
      description: iData.resultRecommendCommentDescription,
      grade: iData.resultRecommendCommentGrade
    }
  ]
  return (
    <div className="flex flex-col rounded-3xl border-2 border-sub200 p-4">
      <div className="text-lg font-semibold mb-2 text-sub700">
        {t('gait_overview_result')}
      </div>
      <div className="flex items-center gap-2 ">
        <div className="w-3 h-3 rounded-sm bg-mainBlue-600" />
        <div className="text-mainBlue-600 text-sm sm:text-base font-bold ">
          {t('gait_pattern')}
        </div>
      </div>
      <div className="relative w-full text-center font-semibold text-sub700 text-base sm:text-lg py-2">{iData.resultGaitTypeTitle}</div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {infoHorizonCards.map((card, id) => (
          <GaitInfoHorizonCard key={id} type={card.type} title={card.title} grade={card.grade} />
        ))}
      </div>


      <div className="flex items-center gap-2 ">
        <div className="w-3 h-3 rounded-sm bg-mainBlue-600" />
        <div className="text-mainBlue-600 text-sm sm:text-base font-bold ">
          {t('label_description')}
        </div>
      </div>
      <div className="grid grid-rows-4 h-full gap-2 mt-4">
         {infoVertiCards.map((card, id) => (
            <GaitInfoVertiCard key={id} type={card.type} description={card.description} grade={card.grade} />
          ))}
      </div>
    </div>
  )
};