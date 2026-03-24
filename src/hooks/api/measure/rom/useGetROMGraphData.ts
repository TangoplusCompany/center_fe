import { IMeasureROMItemDetail } from "@/types/measure";
import { useQuery } from "@tanstack/react-query";

/**
 * 사용자 ROM 목록 조회 API
 * @param user_sn 유저 번호
 * @param center_sn 센터 번호
 * @param body_part_number 바디 파트 번호
 */
export const useGetROMGraphData = ({
  user_sn,
  center_sn,
  currentMonth,
  // isMyPage,
}: {
  user_sn: number;
  center_sn?: number;
  currentMonth: number;
  isMyPage: boolean;
}) => {
  return useQuery<IMeasureROMItemDetail>({
    queryKey: ["userROMItemDetail", user_sn, center_sn, currentMonth],
    // queryFn: () => isMyPage ? getROMItemDetailInMy({ user_sn, }) : getROMItemDetail({ user_sn, center_sn, currentMonth }),
    enabled: currentMonth !== undefined && currentMonth > 0,
  });
};