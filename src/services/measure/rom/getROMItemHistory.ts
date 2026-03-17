import { customAxios } from "@/lib/axios";
import { IMeasureROMItemHistoryResponse } from "@/types/measure";

/**
 * 사용자 ROM 목록 조회 API
 * @param user_sn 유저 번호
 * @param center_sn 센터 번호
 * @param body_part_number 바디 파트 번호
 */
export const getROMItemHistory = async ({
  user_sn,
  center_sn,
  measure_type,
  isMyPage,
  page = 1,
  limit = 10,
}: {
  user_sn: number;
  center_sn?: number;
  measure_type?: number;
  isMyPage: boolean;
  page?: number;
  limit?: number;
}) => {

  const apiPath = isMyPage
    ? `/users/${user_sn}/results/measure_type/${measure_type}` // TODO 여기 isMyPage 일때 endpoint 바꿔야됨
    : `/members/${user_sn}/centers/${center_sn}/rom-results/measure-type/${measure_type}`;
  const { data } = await customAxios.get(apiPath, {
    params: { page, limit },
  });
  return data.data as IMeasureROMItemHistoryResponse;
};