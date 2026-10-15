"use client";

import AIExerciseContainer from "./ExerciseContainer";
import { useGetAIAnalysis } from "@/hooks/api/ai/useGetAIAnalysis";
import AISummaryContainer from "./SummaryContainer";
import AILoadingScreen from "./AILoadingScreen";
import { useTranslations } from "next-intl";

export interface ExerciseUserProps {
  user_uuid: string;
  user_sn: string;

}


const AIUserContainer = ({
  user_sn
}: ExerciseUserProps) => {
  const t = useTranslations("Index");
  const {
    data: aiResult,
    isLoading: aiResultLoading,
    isError: aiResultError,
  } = useGetAIAnalysis(
    parseInt(user_sn) 
  );
  const data = aiResult?.data;
  if (aiResultLoading) {
    return <AILoadingScreen />;
  }

  if (aiResultError) {
    return <div>{t("data_error_msg_1")}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div 
        className="animate-slideDown"
        style={{ animationDelay: '0ms' }}
      >
        <AISummaryContainer 
          problem_areas={data?.analysis.problem_areas} 
          summary={data?.analysis.summary ?? ""} 
        />
      </div>
      
      <div 
        className="animate-slideDown"
        style={{ animationDelay: '200ms' }}
      >
        <AIExerciseContainer 
          exerciseDetails={data?.analysis.exercise_details ?? []} 
        />
      </div>
    </div>
  );
}

export default AIUserContainer;