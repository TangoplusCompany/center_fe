import { customAxios, customUserAxios } from "@/lib/axios";
import { MeasureSummary } from "@/types/measure";
import { useQuery } from "@tanstack/react-query";

export const useGetMeasureSummary = ({
  measure_sn,
  user_sn,
  isResultPage = false,
}: {
  measure_sn: string | undefined;
  user_sn: string;
  isResultPage?: boolean;
}) => {
  const axiosInstance = isResultPage ? customUserAxios : customAxios;
  const apiPath = isResultPage
    ? `/users/${user_sn}/measurement/${measure_sn}/upper-lower-summary`
    : `/members/${user_sn}/measurement/${measure_sn}/upper-lower-summary`;

  const enabled = measure_sn !== undefined && user_sn !== undefined;

  return useQuery<MeasureSummary>({
    queryKey: isResultPage
      ? ["userResultMeasureSummary", measure_sn, user_sn]
      : ["measureSummary", measure_sn, user_sn],
    queryFn: async () => {
      const response = await axiosInstance.get(apiPath);
      // isResultPage일 때는 응답 구조가 다를 수 있음
      return isResultPage ? (response.data?.data || response.data) : response.data.data;
    },
    enabled,
  });
};