import { customAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useMeasureList = <T>(
  page: number,
  limit: number,
  deviceSn: string,
) => {
  return useQuery<T>({
    queryKey: ["measureList", page, limit, deviceSn],
    queryFn: async () => {
      const response = await customAxios.get(`/measurement`, {
        params: {
          page,
          limit,
          device_sn: deviceSn,
        },
      });
      return response.data;
    },
  });
};
