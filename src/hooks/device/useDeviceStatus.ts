import { customAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetDeviceStatus = <T>() => {
  return useQuery<T>({
    queryKey: ["deviceStatusList"],
    queryFn: async () => {
      const response = await customAxios.get("/kiosks");
      return { ...response.data };
    },
  });
};
