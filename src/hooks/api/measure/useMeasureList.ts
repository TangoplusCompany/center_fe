import { getMeasureList } from "@/services/measure/getMeasureList";
import { useQuery } from "@tanstack/react-query";

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
  return useQuery<T>({
    queryKey: ["measureList", params],
    queryFn: async () => {
      const response = await getMeasureList(params);
      return response.data;
    },
  });
};
