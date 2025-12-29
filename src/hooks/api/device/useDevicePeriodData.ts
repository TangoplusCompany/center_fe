import { getDevicePeriodData } from "@/services/device/getDevicePeriodData";
import { useQuery } from "@tanstack/react-query";
import { DeviceChartList } from "@/types/device"; // Adjust the import path as needed

/**
 * 센터 기기 기간별 차트 데이터 조회 Hooks
 * @param period 기간 (1w, 1m, 3m)
 * @returns 센터 기기 기간별 차트 데이터 조회 쿼리
 */
export const useDevicePeriodData = (period: string) => {
  return useQuery<DeviceChartList[]>({
    queryKey: ["DevicePeriodData", period],
    queryFn: async () => await getDevicePeriodData({ period }),
  });
};
