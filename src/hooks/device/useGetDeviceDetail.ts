import { customUnAuthAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetDeviceDetail = <T>(sn: number) => {
  return useQuery<T>({
    queryKey: ["deviceStatus"],
    queryFn: async () => {
      const response = await customUnAuthAxios.get(`/api/device/${sn}`);
      return response.data;
    },
  });
};
