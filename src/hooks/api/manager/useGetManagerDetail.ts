import { getCenterManagerDetail } from "@/services/center/getCenterManagerDetail";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/providers/AuthProvider";

/**
 * 센터 관리자 상세 조회 Hooks
 * @param managerSn 센터 관리자 번호
 * @returns 센터 관리자 상세 조회 쿼리
 */
export const useGetManagerDetail = ({ managerSn }: { managerSn: string }) => {
  const centerSn = useAuthStore((state) => state.centerSn);

  return useQuery({
    queryKey: ["ManagerDetails", managerSn, centerSn],
    queryFn: () =>
      getCenterManagerDetail({ center_sn: centerSn, sn: managerSn }),
    enabled: managerSn !== "0" && centerSn > 0,
  });
};
