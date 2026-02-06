import { getDeviceStatus } from "@/services/device/getDeviceStatus";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/providers/AuthProvider";

/**
 * 센터 기기 상태 조회 Hooks
 * @returns 센터 기기 상태 조회 쿼리
 */
export const useGetDeviceStatus = <T>() => {
  const centerSn = useAuthStore((state) => state.centerSn);

  return useQuery<T>({
    queryKey: ["deviceStatusList", centerSn],
    queryFn: async () => {
      return await getDeviceStatus(centerSn);
    },
    enabled: centerSn > 0,
  });
};
