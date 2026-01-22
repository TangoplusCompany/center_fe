import { useQuery } from "@tanstack/react-query";
import { customAxios, customUserAxios } from "@/lib/axios";

/**
 * 사용자 측정 데이터 JSON GET Hooks
 * @param user_sn 사용자 번호
 * @param isResultPage result-page에서 사용하는지 여부
 * @returns 사용자 측정 데이터 JSON GET 쿼리
 */
export const useGetUserDashboard = <T>({
  user_sn,
  isResultPage = false,
}: {
  user_sn: number | undefined;
  isResultPage?: boolean;
}) => {
  const axiosInstance = isResultPage ? customUserAxios : customAxios;
  const apiPath = isResultPage 
    ? `/users/${user_sn}/measure-summary`
    : `/members/${user_sn}/measure-summary`;

  return useQuery<T>({
    queryKey: isResultPage 
      ? ["userResultMeasureSummary", user_sn]
      : ["userMeasureSummary", user_sn],
    queryFn: async () => {
      const response = await axiosInstance.get(apiPath);

      return response.data.data;
    },
    enabled: user_sn !== undefined && user_sn !== 0,
  });
};
