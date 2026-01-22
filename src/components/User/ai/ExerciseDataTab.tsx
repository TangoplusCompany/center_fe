import { ExerciseDetail } from "@/types/aiAnalysis";
import { EXERCISE_TYPE_IDS } from "./ExerciseContainer";

interface ExerciseDataTabProps {
  selectedPart: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  onSelectPart: (part: 0 | 1 | 2 | 3 | 4 | 5 | 6) => void;
  exercises:  ExerciseDetail[];
}

const ExerciseDataTab = ({ selectedPart, onSelectPart, exercises }: ExerciseDataTabProps) => {
  const tabs = [
    { id: 0, label: "전체보기" },
    { id: 1, label: "목(경추)" },
    { id: 2, label: "어깨(견관절)" },
    { id: 3, label: "팔꿉(주관절)" },
    { id: 4, label: "골반(고관절)" },
    { id: 5, label: "무릎(슬관절)" },
    { id: 6, label: "발목(족관절)" },
  ] as const;

  const availableTypeIds = new Set(exercises.map(ex => ex.exercise_type_id));

  const availableTabs = tabs.filter((tab) => {
    if (tab.id === 0) return true; // 전체보기는 항상 표시
    
    const exerciseTypeId = EXERCISE_TYPE_IDS[tab.id];
    return availableTypeIds.has(exerciseTypeId); // exercises에 해당 type_id가 있는지 확인
  });

  return (
    <div className="w-full table table-fixed min-w-0">
      <div className="flex gap-4 overflow-x-auto pb-2 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {availableTabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSelectPart(tab.id)}
          className={`
            px-4 py-1 rounded-xl font-medium whitespace-nowrap transition-all flex-shrink-0
            ${
              selectedPart === tab.id
                ? "border border-toggleAccent text-toggleAccent bg-toggleAccent-background"
                : "bg-white border border-sub300 text-sub300 hover:border-sub600 hover:text-sub600"
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>

    </div>
    
  );
};

export default ExerciseDataTab;