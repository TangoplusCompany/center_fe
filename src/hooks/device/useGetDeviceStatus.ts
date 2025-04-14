import customAxios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetDeviceStatus = <T>(centerId?: number) => {
  return useQuery<T>({
    queryKey: ["deviceStatus"],
    queryFn: async () => {
      const response = await customAxios.get("/api/device/status");
      return response.data;
    },
  });
};
