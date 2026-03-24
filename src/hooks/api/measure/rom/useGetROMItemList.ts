import { getROMItemList } from "@/services/measure/rom/getROMItemList";
import { IMeasureROMTypeItem } from "@/types/measure";
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
  isMyPage,
}: {
  user_sn: number;
  center_sn?: number;
  body_part_number: number;
  isMyPage: boolean;
}) => {
  return useQuery<IMeasureROMTypeItem[]>({
    queryKey: ["userROMItemList", user_sn, center_sn, body_part_number, isMyPage],
    queryFn: () => getROMItemList({ user_sn, center_sn, body_part_number, isMyPage }),
    enabled: body_part_number !== undefined ,
  });
};