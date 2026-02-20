import { getROMItemList } from "@/services/measure/rom/getROMItemList";
import { IMeasureROMItem } from "@/types/measure";
import { useQuery } from "@tanstack/react-query";

/**
 * 사용자 ROM 목록 조회 API
 * @param user_sn 유저 번호
 * @param center_sn 센터 번호
 * @param body_part_number 바디 파트 번호
 */
export const useGetROMItemList = ({
  user_sn,
  center_sn,
  body_part_number,
}: {
  user_sn: number;
  center_sn?: number;
  body_part_number?: number;
}) => {
  return useQuery<IMeasureROMItem[]>({
    queryKey: ["userROMItemList", user_sn, center_sn, body_part_number],
    queryFn: () => getROMItemList({ user_sn, center_sn, body_part_number }),
    enabled: body_part_number !== undefined && body_part_number > 0,
  });
};