import { getROMItemHistory } from "@/services/measure/rom/getROMItemHistory";
import { IMeasureROMItemHistoryResponse } from "@/types/measure";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

/**
 * 사용자 ROM 목록 조회 API
 * @param user_sn 유저 번호
 * @param center_sn 센터 번호
 * @param body_part_number 바디 파트 번호
 */
export const useGetROMItemHistory = ({
  user_sn,
  center_sn,
  measure_type,
  page = 1,
  limit = 10
}: {
  user_sn: number;
  center_sn?: number;
  measure_type: number;
  page?: number;
  limit ?: number;
}) => {
  return useQuery<IMeasureROMItemHistoryResponse>({
    queryKey: ["userROMItemHistory", user_sn, center_sn, measure_type, page, limit],
    queryFn: () => getROMItemHistory({ user_sn, center_sn, measure_type, page, limit }),
    enabled: measure_type >= 13,
    placeholderData: keepPreviousData, // measure_type < 13일 때 빈 배열 반환
  });
};