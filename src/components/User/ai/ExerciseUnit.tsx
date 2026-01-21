import { ExerciseDetail } from "@/types/aiAnalysis";
import { useState } from "react";
import ExercisePlayDialog from "./ExercisePlayDialog";

interface AIExerciseUnitProps {
  ed : ExerciseDetail;
}
const AIExerciseUnit = ( {
  ed
}: AIExerciseUnitProps) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const reasonUnitTitles = ['운동 추천 이유', '운동 주의 사항']
  const ExerciseReasonUnit = ({idx, text} : {idx: 0 | 1, text: string}) => {
    return (
      <div className="flex flex-col gap-4">
        <div className={`text-lg font-semibold ${idx === 0 ? 'text-toggleAccent' : 'text-danger'}`}>
          {reasonUnitTitles[idx]}
        </div>
        <div className="text-base">
          {text}
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-xl shadow-md p-2">
      <div className="flex flex-col gap-4 bg-toggleAccent-background rounded-lg ">
        <div className="flex gap-2 text-lg font-semibold p-4">
          <div className="w-1 h-6 bg-toggleAccent rounded-full" />
          {ed.exercise_name}
        </div>

        <div className="px-4">{ed.related_symptom}</div>
        <div 
          className="relative w-auto h-[256px] cursor-pointer" 
          onClick={() => setIsVideoOpen(true)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${ed.image_filepath_real}`}
            alt="운동 썸네일"
            className="w-full h-full bg-sub300 rounded-xl object-cover"
            onError={(e) => {
              e.currentTarget.src = "/images/measure_default.png";
            }}
          />
          
          {/* 재생 버튼 (중앙 배치) - pointer-events-none 추가 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/icons/ic_play.svg`}
              alt="재생버튼"
              className="w-12 h-12"
              onError={(e) => {
                e.currentTarget.src = "/images/measure_default.png";
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-8">
          <ExerciseReasonUnit idx={0} text={ed.recommendation_reason} />
          <ExerciseReasonUnit idx={1} text={ed.exercise_caution} />
      </div>
      
      <ExercisePlayDialog
        open={isVideoOpen}
        onOpenChange={setIsVideoOpen}
        videoUrl={ed.video_filepath}
        title={`운동 ${ed.exercise_name}`}
      />
    </div>
  )
};

export default AIExerciseUnit;