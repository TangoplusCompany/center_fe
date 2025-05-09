import { customAxios } from "@/lib/axios";
import { getMeasureList } from "@/services/measure/getMeasureList";
import { useQuery } from "@tanstack/react-query";

export const useMeasureList = <T>(
  page: number,
  limit: number,
  deviceSn: string,
) => {
  return useQuery<T>({
    queryKey: ["measureList", page, limit, deviceSn],
    queryFn: async () => {
      return await getMeasureList({ page, limit, deviceSn });
    },
  });
};
