import { customAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

/**
 * 최근 추가된 사용자 조회 Hooks
 * @returns 최근 추가된 사용자 조회 쿼리
 */
export const useGetLatestAddUser = <T>() =>
  useQuery<T>({
    queryKey: ["UserAddLatest"],
    queryFn: async () => {
      const { data } = await customAxios.get("/members/latest");
      return data.data;
    },
  });
