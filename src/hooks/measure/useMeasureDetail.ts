import { customAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useMeasureDetail = <T>(sn: number, user_uuid: string) => {
  return useQuery<T>({
    queryKey: ["measureDetail", sn, user_uuid],
    queryFn: async () => {
      const response = await customAxios.get(`/measurement/${sn}`, {
        params: {
          user_uuid,
        },
      });
      return response.data.data;
    },
    enabled: sn !== undefined && user_uuid !== undefined
  });
};
