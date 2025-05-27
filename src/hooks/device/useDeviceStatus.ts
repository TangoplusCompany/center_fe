import { getDeviceStatus } from "@/services/device/getDeviceStatus";
import { useQuery } from "@tanstack/react-query";

export const useGetDeviceStatus = <T>() => {
  return useQuery<T>({
    queryKey: ["deviceStatusList"],
    queryFn: async () => {
      return await getDeviceStatus();
    },
  });
};
