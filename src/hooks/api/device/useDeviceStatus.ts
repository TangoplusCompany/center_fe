import { getDeviceStatus } from "@/services/device/getDeviceStatus";
import { useQuery } from "@tanstack/react-query";

/**
 * 센터 기기 상태 조회 Hooks
 * @returns 센터 기기 상태 조회 쿼리
 */
export const useGetDeviceStatus = <T>() => {
  return useQuery<T>({
    queryKey: ["deviceStatusList"],
    queryFn: async () => {
      return await getDeviceStatus();
    },
  });
};
