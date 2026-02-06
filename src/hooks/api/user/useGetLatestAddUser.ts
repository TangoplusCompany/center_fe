import { customAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/providers/AuthProvider";

/**
 * 최근 추가된 사용자 조회 Hooks
 * @returns 최근 추가된 사용자 조회 쿼리
 */
export const useGetLatestAddUser = <T>() => {
  const centerSn = useAuthStore((state) => state.centerSn);

  return useQuery<T>({
    queryKey: ["UserAddLatest", centerSn],
    queryFn: async () => {
      const { data } = await customAxios.get(`/members/centers/${centerSn}/latest`);
      return data.data;
    },
    enabled: centerSn > 0,
  });
};
