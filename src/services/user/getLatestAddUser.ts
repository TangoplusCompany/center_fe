import { customAxios } from "@/lib/axios";

/**
 * 최근 추가된 사용자 조회 API
 * @param center_sn 센터 번호
 * @returns 최근 추가된 사용자 조회 응답
 */
export const getLatestAddUser = async (center_sn: number) => {
  const response = await customAxios.get(
    `/members/centers/${center_sn}/latest`,
  );
  return response.data;
};
