import { useQuery } from "@tanstack/react-query";
import { customAxios } from "@/lib/axios";

/**
 * 사용자 측정 데이터 JSON GET Hooks
 * @param json 측정 데이터 JSON 경로
 * @returns 사용자 측정 데이터 JSON GET 쿼리
 */
export const useGetUserDashboard = <T>(
  user_sn: number | undefined
) => {
  return useQuery<T>({
    queryKey: ["userMeasureSummary", user_sn],
    queryFn: async () => {
      const response = await customAxios.get(
        `/members/${user_sn}/measure-summary`
      );
      return response.data.data;
    },
    enabled: user_sn !== undefined && user_sn !== 0,
  });
};
