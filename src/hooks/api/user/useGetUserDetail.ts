import { getUserDetail } from "@/services/user/getUserDetail";
import { getResultUserDetail } from "@/services/user/getResultUserDetail";
import { useQuery } from "@tanstack/react-query";

/**
 * 사용자 상세 정보 조회
 * @param userSn user_sn
 * @param isResultPage result-page에서 사용하는지 여부
 * @returns 사용자 상세 정보
 */
export const useGetUserDetail = ({ userSn, isResultPage = false }: { userSn: string, isResultPage?: boolean }) => {
  return useQuery({
    queryKey: isResultPage 
      ? ["userResultDetail", userSn]
      : ["userDetail", userSn],
    queryFn: async () => {
      const result = isResultPage
        ? await getResultUserDetail({ sn: userSn })
        : await getUserDetail({ sn: userSn });
      return result.data;
    },
    enabled: userSn !== undefined && userSn !== "0"
  });
};
