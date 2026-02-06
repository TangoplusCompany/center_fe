import { customAxios } from "@/lib/axios";
import { ICenterActivityResponse } from "@/types/center";

/**
 * 센터 활동/통계 조회 API
 * @param centerSn 센터 번호
 * @returns 센터 활동 데이터
 */
export const getCenterActivity = async (centerSn: number) => {
  const { data } = await customAxios.get<ICenterActivityResponse>(
    `/kiosks/centers/${centerSn}/statistics`,
  );
  return data.data ?? [];
};
