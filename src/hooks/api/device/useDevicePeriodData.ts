import { getDevicePeriodData } from "@/services/device/getDevicePeriodData";
import { useAuthStore } from "@/providers/AuthProvider";
import { DeviceDailyUsage } from "@/types/device";
import { useQuery } from "@tanstack/react-query";

/**
 * 센터 기기 기간별 차트 데이터 조회 Hooks
 * @returns 센터 기기 기간별 차트 데이터 조회 쿼리
 */
export const useDevicePeriodData = () => {
  const centerSn = useAuthStore((state) => state.centerSn);

  return useQuery<DeviceDailyUsage[]>({
    queryKey: ["devicePeriodData", centerSn],
    queryFn: async () => await getDevicePeriodData(centerSn),
    enabled: centerSn > 0,
  });
};