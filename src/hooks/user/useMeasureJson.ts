import { customUnAuthAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useMeasureJson = (json_path: string) => {
  return useQuery({
    queryKey: ["measureJson", json_path],
    queryFn: async () => {
      // const response = await customUnAuthAxios.get(`/api/user/pose/${json_path}`);
      const response = await customUnAuthAxios.get(`/data/Results/${json_path}`);
      return response.data;
    },
  });
};
