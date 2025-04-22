import { customAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetDeviceDetail = <T>(sn: number) => {
  return useQuery<T>({
    queryKey: ["deviceDetail", sn],
    queryFn: async () => {
      const response = await customAxios.get(`/kiosks/${sn}`);
      return response.data;
    },
  });
};
