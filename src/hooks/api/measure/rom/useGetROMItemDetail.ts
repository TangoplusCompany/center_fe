import { getROMItemDetail } from "@/services/measure/rom/getROMItemDetail";
import { IMeasureROMItemDetail } from "@/types/measure";
import { useQuery } from "@tanstack/react-query";

/**
 * 사용자 ROM 목록 조회 API
 * @param user_sn 유저 번호
 * @param center_sn 센터 번호
 * @param body_part_number 바디 파트 번호
 */
export const useGetROMItemDetail = ({
  user_sn,
  center_sn,
  rom_result_sn,
}: {
  user_sn: number;
  center_sn?: number;
  rom_result_sn?: number;
}) => {
  return useQuery<IMeasureROMItemDetail>({
    queryKey: ["userROMItemDetail", user_sn, center_sn, rom_result_sn],
    queryFn: () => getROMItemDetail({ user_sn, center_sn, rom_result_sn }),
    enabled: rom_result_sn !== undefined && rom_result_sn > 0,
  });
};