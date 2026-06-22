
import type { IBiaRecommend } from "../../../types/bia";


export function RecommendCard ({type, title, description} : {type: string, title: string, description: string}) {
  const iconMap: Record<string, string> = {
    "영양처방": "/images/ic_nutrition.png",
    "운동처방": "/images/ic_exercise.png",
    "생활습관": "/images/ic_habit.png",
  };
  return (
    <div className="flex w-full gap-2">
      <div className="h-20 w-20 aspect-square rounded-[4px] bg-sub100 border items-center flex justify-center border-sub200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={iconMap[type]} alt={type} className="w-8 h-8" />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex w-full justify-between items-center">
          <span className="text-sm font-bold text-blackk ">{title}</span>
          <div className="px-1 rounded-[4px] bg-mainBlue-600 text-xs text-white">{type}</div>
        </div>

        <div className="text-xs text-start leading-tight text-sub600">
          {description}
        </div>
      </div>

    </div>
  );
}


export default function Recommend({data}: {data: IBiaRecommend}) {
  
  const types = [
    {
        type: "영양처방",
        title: data.result_nutrition_title,
        description: data.result_nutrition_description
    },
    {
        type: "운동처방",
        title: data.result_exercise_title,
        description: data.result_exercise_description
    },
    {
        type: "생활습관",
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
          체중조절/처방
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
