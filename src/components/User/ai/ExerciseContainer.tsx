import { ExerciseDetail } from "@/types/aiAnalysis";
import AIExerciseUnit from "./ExerciseUnit";

export interface AIExerciseProps {
    exerciseDetails: ExerciseDetail[];
}

const AIExerciseContainer = ( {
  exerciseDetails
}: AIExerciseProps) => {
  const RadialGradientColor = 'radial-gradient(circle, #6BA0EF 45%, #2C4FD0 100%)'
  const RadialGradientShadow = 'inset 0 0 12px rgba(255, 255, 255, 0.75)'
  const SparkleSvg = () => {
    return (
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/icons/ic_ai_analysis.svg`}
          alt="ai반짝임 이미지"
          className="w-8 h-8 p-1"
          onError={(e) => {
            e.currentTarget.src = "/images/measure_default.png";
          }}
        />
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full rounded-2xl border-2 border-sub100 overflow-hidden">
      {/* 헤더 - Radial Gradient */}
      <div 
        style={{
          background: RadialGradientColor, 
          boxShadow: RadialGradientShadow
        }} 
        className="flex items-center text-white text-lg font-semibold px-4 pt-2 pb-6"
      >
        <SparkleSvg />
        AI 맞춤 운동 추천
      </div>

      {/* 운동 목록 카드 - 위로 올라온 느낌 */}
      <div className="flex flex-col bg-white shadow-lg rounded-xl p-4 gap-4 -mt-4">
        {Object.entries(exerciseDetails).map(([key, exerciseDetail], index) => (
          <div key={key}>
            <AIExerciseUnit ed={exerciseDetail} />
            {index < Object.entries(exerciseDetails).length - 1 && (
              <div className="border-b border-sub200 mt-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIExerciseContainer;