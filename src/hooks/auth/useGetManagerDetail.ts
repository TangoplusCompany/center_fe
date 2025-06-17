import { getCenterManagerDetail } from "@/services/center/getCenterManagerDetail";
import { useQuery } from "@tanstack/react-query";

/**
 * 센터 관리자 상세 조회 Hooks
 * @param managerSn 센터 관리자 번호
 * @returns 센터 관리자 상세 조회 쿼리
 */
export const useGetManagerDetail = ({ managerSn }: { managerSn: string }) => {
  return useQuery({
    queryKey: ["ManagerDetails", managerSn],
    queryFn: async () => await getCenterManagerDetail({ sn: managerSn }),
    enabled: managerSn !== "0",
  });
};
