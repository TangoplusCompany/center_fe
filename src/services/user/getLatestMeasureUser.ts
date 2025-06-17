import { customAxios } from "@/lib/axios";

/**
 * 최근 측정된 사용자 조회 API
 * @returns 최근 측정된 사용자 조회 응답
 */
export const getLatestMeasureUser = async () => {
  const response = await customAxios.get(`/members/measurement/latest`);
  return response.data;
};
