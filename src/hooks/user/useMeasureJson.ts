import { customAuthAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useMeasureJson = (json_path: string) => {
  return useQuery({
    queryKey: ["measureJson", json_path],
    queryFn: async () => {
      // const response = await customAuthAxios.get(`/api/user/pose/${json_path}`);
      const response = await customAuthAxios.get(`/data/Results/${json_path}`);
      return response.data;
    },
  });
};
