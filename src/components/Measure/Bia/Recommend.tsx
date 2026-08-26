
import { useTranslations } from "next-intl";
import type { IBiaRecommend } from "../../../types/bia";


export function RecommendCard ({type, title, description} : {type: string, title: string, description: string}) {
  const t = useTranslations("Index")
  const iconMap: Record<string, string> = {
    "bia_nutrition_prescription": "/images/ic_nutrition.png",
    "bia_exercise_prescription": "/images/ic_exercise.png",
    "bia_lifestyle_prescription": "/images/ic_habit.png",
  };
  return (
    <div className="flex w-full gap-2">
      <div className="w-20 h-20 px-2 py-1 aspect-square rounded-[4px] bg-sub100 border items-center flex justify-center border-sub200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={iconMap[type]} alt={type} className="w-12 h-12" />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex w-full justify-between items-center">
          <span className="text-sm font-bold text-blackk ">{title}</span>
          <div className="px-2 py-1 rounded-[4px] bg-mainBlue-600 text-xs text-white">{t(type)}</div>
        </div>

        <div className="text-xs text-start leading-tight text-sub600">
          {description}
        </div>
      </div>

    </div>
  );
}


export default function Recommend({data}: {data: IBiaRecommend}) {
  const t = useTranslations("Index")
  const types = [
    {
        type: "bia_nutrition_prescription",
        title: data.result_nutrition_title,
        description: data.result_nutrition_description
    },
    {
        type: "bia_exercise_prescription",
        title: data.result_exercise_title,
        description: data.result_exercise_description
    },
    {
        type: "bia_lifestyle_prescription",
        title: data.result_habits_title,
        description: data.result_habits_description
    },

  ]
  return (
    <div className="flex flex-col gap-2 px-2 w-full h-full rounded-lg border border-sub200  p-2">
      {/* 1. 타이틀 영역 (작성하신 부분) */}
      <div className="flex gap-2 items-center text-mainBlue-600 font-bold">
        <div className="w-3 h-3 rounded-[3px] bg-mainBlue-600" />
        <div className="text-mainBlue-600 font-bold text-sm ">
          {t('bia_weight_control_prescription')}
        </div>
      </div>

      <div className="grid grid-rows-3 h-full gap-2">
        {types.map( (type) => (
          <RecommendCard key={type.title} type={type.type} title={type.title} description={type.description} />
        )

        )}
      </div>
      
      
    </div>
  );
}
