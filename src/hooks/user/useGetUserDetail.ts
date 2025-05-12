import { getUserDetail } from "@/services/user/getUserDetail";
import { useQuery } from "@tanstack/react-query";

export const useGetUserDetail = ({ userSn }: { userSn: string }) => {
  return useQuery({
    queryKey: ["userDetail", userSn],
    queryFn: async () => {
      const result = await getUserDetail({ sn: userSn });
      return result.data;
    },
  });
};
