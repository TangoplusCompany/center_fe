
import type { IBiaRecommend } from "../../../types/bia";


export function RecommendCard ({type, title, description} : {type: string, title: string, description: string}) {
  const iconMap: Record<string, string> = {
    "영양처방": "/images/ic_nutrition.png",
    "운동처방": "/images/ic_exercise.png",
    "생활습관": "/images/ic_habit.png",
  };
  return (
    <div className="flex w-full gap-2">
      <div className="h-20 w-20 print:w-14 print:h-14 aspect-square rounded-[4px] bg-sub100 border items-center flex justify-center border-sub200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={iconMap[type]} alt={type} className="w-8 h-8" />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex w-full justify-between items-center">
          <span className="text-xs font-bold text-blackk ">{title}</span>
          <div className="px-1 rounded-[4px] bg-accent text-[9px] text-white">{type}</div>
        </div>

        <div className="text-[10px] text-start leading-tight text-sub600">
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
    <div className="flex flex-col gap-2 px-2 w-full h-full">
      {/* 1. 타이틀 영역 (작성하신 부분) */}
      <div className="flex gap-2 items-center text-accent font-bold">
        <div className="w-3 h-3 rounded-[3px] bg-accent" />
        <div className="text-accent font-bold text-sm ">
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
