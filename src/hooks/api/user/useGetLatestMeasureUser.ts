import { customAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/providers/AuthProvider";

/**
 * 최근 측정된 사용자 조회 Hooks
 * @returns 최근 측정된 사용자 조회 쿼리
 */
export const useGetLatestMeasureUser = <T>() => {
  const centerSn = useAuthStore((state) => state.centerSn);

  return useQuery<T>({
    queryKey: ["UserMeasureLatest", centerSn],
    queryFn: async () => {
      const { data } = await customAxios.get(
        `/members/centers/${centerSn}/measurement/latest`,
      );
      return data.data;
    },
    enabled: centerSn > 0,
  });
};
