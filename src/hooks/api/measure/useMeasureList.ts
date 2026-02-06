import { getMeasureList } from "@/services/measure/getMeasureList";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/providers/AuthProvider";

interface IUseMeasureListProps {
  page?: number;
  limit?: number;
  deviceSn?: string;
  search?: string;
}

/**
 * 측정 목록 조회 Hooks
 * @param params 측정 목록 조회 파라미터
 * @returns 측정 목록 조회 쿼리
 */
export const useMeasureList = <T>(params: IUseMeasureListProps) => {
  const centerSn = useAuthStore((state) => state.centerSn);

  return useQuery<T>({
    queryKey: ["measureList", params, centerSn],
    queryFn: async () => {
      const response = await getMeasureList({ center_sn: centerSn, ...params });
      return response.data;
    },
    enabled: centerSn > 0,
  });
};
