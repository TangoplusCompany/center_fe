import { customAxios, customUserAxios } from "@/lib/axios";
import { IMeasureROMCount } from "@/types/measure";

/**
 * 사용자 ROM 목록 조회 API
 * @param user_sn 유저 번호
 * @param center_sn 센터 번호
 * @param body_part_number 바디 파트 번호
 */
export const getROMItemCount = async ({
  user_sn,
  center_sn,
  body_part_number,
  isMyPage, 
}: {
  user_sn: number;
  center_sn?: number;
  body_part_number: number;
  isMyPage: boolean;
}): Promise<IMeasureROMCount> => {
  const axiosInstance = isMyPage ? customUserAxios : customAxios;
  const apiPath = isMyPage 
  ? `/users/${user_sn}/rom-score-counts-by-body-parts/${body_part_number}`
  : `/members/${user_sn}/centers/${center_sn}/rom-score-counts-by-body-parts/${body_part_number}`
  const { data } = await axiosInstance.get(apiPath);
  return data.data;
};