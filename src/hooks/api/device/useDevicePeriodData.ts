import { getDevicePeriodData } from "@/services/device/getDevicePeriodData";
import { DeviceDailyUsage } from "@/types/device";
import { useQuery } from "@tanstack/react-query";


/**
 * 센터 기기 기간별 차트 데이터 조회 Hooks
 * @param period 기간 (1w, 1m, 3m)
 * @returns 센터 기기 기간별 차트 데이터 조회 쿼리
 */
export const useDevicePeriodData = () => {
  return useQuery<DeviceDailyUsage[]>({
    queryKey: ["devicePeriodData"], // ← 빈 배열에서 의미있는 키로 변경
    queryFn: async () => await getDevicePeriodData(),
  });
};