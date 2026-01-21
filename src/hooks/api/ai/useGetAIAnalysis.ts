
import { getAIAnalysis } from "@/services/ai/getAIAnalysis";
import { useQuery } from "@tanstack/react-query";

/**
 * AI 운동 추천 사용 Hooks
 * @param sn 사용자 t_user_info의 sn
 * @returns 사용자 측정 보고서 생성 쿼리
 */
export const useGetAIAnalysis = (sn: number) => {
  return useQuery({
    queryKey: ["getRecommendExercise", sn],
    queryFn: () => getAIAnalysis({ sn }),
    enabled: !!sn,
    
  });
};
