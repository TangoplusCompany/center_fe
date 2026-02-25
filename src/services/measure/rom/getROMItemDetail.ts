import { customAxios } from "@/lib/axios";

/**
 * 사용자 ROM 상세 조회 API
 * @param user_sn 유저 번호
 * @param sn 해당 ROM 번호
 * @param body_part_number 바디 파트 번호
 */
export const getROMItemDetail = async ({
  user_sn,
  center_sn,
  rom_result_sn,
}: {
  user_sn: number;
  center_sn?: number;
  rom_result_sn?: number;
}) => {
  const { data } = await customAxios.get(`/members/${user_sn}/centers/${center_sn}/rom-results/${rom_result_sn}`);
  return data.data;
};
