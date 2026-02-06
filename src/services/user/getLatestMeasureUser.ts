import { customAxios } from "@/lib/axios";

/**
 * 최근 측정된 사용자 조회 API
 * @param center_sn 센터 번호
 * @returns 최근 측정된 사용자 조회 응답
 */
export const getLatestMeasureUser = async (center_sn: number) => {
  const response = await customAxios.get(
    `/members/centers/${center_sn}/measurement/latest`,
  );
  return response.data;
};
