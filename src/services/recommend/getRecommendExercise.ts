import { customAxios } from "@/lib/axios";

/**
 * AI 운동 추천 사용 API
 * @returns 결론 + 운동 결과 전체 조회
 */
export const getRecommendExercise = async ({
  user_uuid,
  sn 
}: {
  user_uuid: string;
  sn: number;
 }) => {
  const response = await customAxios.post(`/members`, { // TODO endPoint 변경 필요
    user_uuid: user_uuid,
    sn: sn,
  });
  return response.data;
};
