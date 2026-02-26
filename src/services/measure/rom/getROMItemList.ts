import { customAxios } from "@/lib/axios";
import { IMeasureROMItem } from "@/types/measure";

/**
 * 사용자 ROM 목록 조회 API
 * @param user_sn 유저 번호
 * @param center_sn 센터 번호
 * @param body_part_number 바디 파트 번호
 */
export const getROMItemList = async ({
  user_sn,
  center_sn,
  body_part_number,
}: {
  user_sn: number;
  center_sn?: number;
  body_part_number: number;
}): Promise<IMeasureROMItem[]> => {
  const { data } = await customAxios.get(`/members/${user_sn}/centers/${center_sn}/latest-rom-results/${body_part_number > 0 ? `${body_part_number}` : ""}`);
  return data.data;
};