import { getDevicePeriodData } from "@/services/device/getDevicePeriodData";
import { useQuery } from "@tanstack/react-query";

import { DeviceChartList } from "@/types/device"; // Adjust the import path as needed

export const useDevicePeriodData = (period: string) => {
  return useQuery<DeviceChartList[]>({
    queryKey: ["DevicePeriodData", period],
    queryFn: async () => await getDevicePeriodData({ period }),
  });
};
