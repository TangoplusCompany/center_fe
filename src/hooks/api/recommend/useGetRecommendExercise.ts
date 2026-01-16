
import { getRecommendExercise } from "@/services/recommend/getRecommendExercise";
import { useQuery } from "@tanstack/react-query";

/**
 * AI 운동 추천 사용 Hooks
 * @param user_uuid 사용자 UUID
 * @param sn 사용자 t_user_info의 sn
 * @returns 사용자 측정 보고서 생성 쿼리
 */
export const useGetRecommendExercise = (user_uuid: string, sn: number) => {
  return useQuery({
    queryKey: ["postUserReport", user_uuid, sn],
    queryFn: () => getRecommendExercise({ user_uuid, sn }),
    enabled: !!user_uuid && !!sn,
  });
};
