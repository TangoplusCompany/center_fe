import { getROMItems } from "@/services/measure/rom/getROMItems";
import { IMeasureROMItem } from "@/types/measure";
import { useQuery } from "@tanstack/react-query";

/**
 * 사용자 ROM 목록 조회 API
 * @param user_sn 유저 번호
 * @param center_sn 센터 번호
 * @param body_part_number 바디 파트 번호
 */
export const useGetROMItems = ({
  user_sn,
  center_sn,
  measure_sn,
}: {
  user_sn: number;
  center_sn?: number;
  measure_sn: number;
}) => {
  return useQuery<IMeasureROMItem[]>({
    queryKey: ["userROMItems", user_sn, center_sn, measure_sn],
    queryFn: () => getROMItems({ user_sn, center_sn, measure_sn }),
    enabled: measure_sn !== undefined ,
  });
};