import { getDevicePeriodData } from "@/services/user/getDevicePeriodData";
import { useQuery } from "@tanstack/react-query";

export const useDevicePeriodData = <T>(period: string) => {
  return useQuery<T>({
    queryKey: ["DevicePeriodData", period],
    queryFn: async () => await getDevicePeriodData({ period }),
  });
};
