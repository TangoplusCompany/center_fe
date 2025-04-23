import { customAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetUserDetail = ({ userSn }: { userSn: string }) => {
  return useQuery({
    queryKey: ["userDetail", userSn],
    queryFn: async () => {
      const result = await customAxios.get(`/members/${userSn}`);
      return result.data;
    },
  });
};
