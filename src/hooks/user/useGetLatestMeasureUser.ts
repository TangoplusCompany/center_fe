import { customAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

/**
 * 최근 측정된 사용자 조회 Hooks
 * @returns 최근 측정된 사용자 조회 쿼리
 */
export const useGetLatestMeasureUser = <T>() =>
  useQuery<T>({
    queryKey: ["UserMeasureLatest"],
    queryFn: async () => {
      const { data } = await customAxios.get("/members/measurement/latest");
      return data.data;
    },
  });
