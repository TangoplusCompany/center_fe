import { customAxios } from "@/lib/axios";

/**
 * 최근 추가된 사용자 조회 API
 * @returns 최근 추가된 사용자 조회 응답
 */
export const getLatestAddUser = async () => {
  const response = await customAxios.get(`/members/measurement/latest`);
  return response.data;
};
