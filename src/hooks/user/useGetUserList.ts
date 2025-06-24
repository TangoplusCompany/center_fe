import { getUserList } from "@/services/user/getUserList";
import { useQuery } from "@tanstack/react-query";

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
export const useGetUserList = <T>(params: IUseUserListProps) =>
  useQuery<T>({
    queryKey: ["CenterUserList", params],
    queryFn: async () => {
      const response = await getUserList(params);
      return response.data;
    },
  });
