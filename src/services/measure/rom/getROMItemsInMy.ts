import { customUserAxios } from "@/lib/axios";
import { IMeasureROMItem } from "@/types/measure";

/**
 * 사용자 ROM 목록 조회 API
 * @param user_sn 유저 번호
 * @param measure_sn serverSn 넣기 (t_measure_info의 sn)
 */
export const getROMItemsInMy = async ({
  user_sn,
  measure_sn,
}: {
  user_sn: number;
  measure_sn: number;
}): Promise<IMeasureROMItem[]> => {
  const { data } = await customUserAxios.get(`/users/${user_sn}/rom-results-with-measure-sn/${measure_sn}`);
  return data.data;
};