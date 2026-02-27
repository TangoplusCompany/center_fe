import { customAxios } from "@/lib/axios";
import { IMeasureROMItem } from "@/types/measure";

/**
 * 사용자 ROM 목록 조회 API
 * @param user_sn 유저 번호
 * @param center_sn 센터 번호
 * @param measure_sn serverSn 넣기 (t_measure_info의 sn)
 */
export const getROMItems = async ({
  user_sn,
  center_sn,
  measure_sn,
}: {
  user_sn: number;
  center_sn?: number;
  measure_sn: number;
}): Promise<IMeasureROMItem[]> => {
  const { data } = await customAxios.get(`/members/${user_sn}/centers/${center_sn}/rom-results-with-measure-sn/${measure_sn}`);
  console.log(data)
  return data.data;
};