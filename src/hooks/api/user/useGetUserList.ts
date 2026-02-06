import { getUserList } from "@/services/user/getUserList";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/providers/AuthProvider";

interface IUseUserListProps {
  page?: number;
  limit?: number;
  search?: string;
}

/**
 * 센터 사용자 목록 조회 Hooks
 * @param params 센터 사용자 목록 조회 파라미터
 * @returns 센터 사용자 목록 조회 쿼리
 */
export const useGetUserList = <T>(params: IUseUserListProps) => {
  const centerSn = useAuthStore((state) => state.centerSn);

  return useQuery<T>({
    queryKey: ["CenterUserList", params, centerSn],
    queryFn: async () => {
      const response = await getUserList({ center_sn: centerSn, ...params });
      return response.data;
    },
    enabled: centerSn > 0,
  });
};
