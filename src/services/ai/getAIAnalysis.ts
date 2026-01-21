import { customAxios } from "@/lib/axios";
import { AiAnalysisResponse } from "@/types/aiAnalysis";

/**
 * AI 운동 추천 사용 API
 * @returns 결론 + 운동 결과 전체 조회
 */
export const getAIAnalysis = async ({
  sn 
}: {
  sn: number
 }) => {
  const response = await customAxios.get<AiAnalysisResponse>(`/ai-analysis/${sn}`);
  return response.data;
};
