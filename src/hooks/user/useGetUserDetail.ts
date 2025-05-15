import { getUserDetail } from "@/services/user/getUserDetail";
import { useQuery } from "@tanstack/react-query";

/**
 * 사용자 상세 정보 조회
 * @param userSn user_sn
 * @returns 사용자 상세 정보
 */
export const useGetUserDetail = ({ userSn }: { userSn: string }) => {
  return useQuery({
    queryKey: ["userDetail", userSn],
    queryFn: async () => {
      const result = await getUserDetail({ sn: userSn });
      return result.data;
    },
    enabled: userSn !== undefined && userSn !== "0"
  });
};
