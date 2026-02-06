import { useQuery } from "@tanstack/react-query";
import { getCenterActivity } from "@/services/center/getCenterActivity";
import { useAuthStore } from "@/providers/AuthProvider";
import { ICenterActivityResponse } from "@/types/center";

/**
 * 센터 대시보드 메인 4가지 측정수, 사용량, 그래프 데이터 확인
 * @returns 센터 대시보드 데이터 조회 쿼리
 */
export const useGetCenterActivity = () => {
  const centerSn = useAuthStore((state) => state.centerSn);

  return useQuery<ICenterActivityResponse>({
    queryKey: ["centerActivity", centerSn],
    queryFn: async () => await getCenterActivity(centerSn),
    enabled: centerSn > 0,
  });
};