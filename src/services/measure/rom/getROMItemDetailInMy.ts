import { customUserAxios } from "@/lib/axios";

/**
 * 사용자 ROM 상세 조회 API
 * @param user_sn 유저 번호
 * @param rom_result_sn t_measure_rom 의 sn을 넣기
 */
export const getROMItemDetailInMy = async ({
  user_sn,
  rom_result_sn,
}: {
  user_sn: number;
  rom_result_sn?: number;
}) => {
  const { data } = await customUserAxios.get(`/users/${user_sn}/rom-results/${rom_result_sn}`);
  return data.data;
};
