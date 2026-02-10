import { customAxios, customUserAxios } from "@/lib/axios";
import { MeasureSummary } from "@/types/measure";
import { useQuery } from "@tanstack/react-query";
import { useAuthStoreOptional } from "@/providers/AuthProvider";

export const useGetMeasureSummary = ({
  measure_sn,
  user_sn,
  isResultPage = false,
}: {
  measure_sn: string | undefined;
  user_sn: string;
  isResultPage?: boolean;
}) => {
  // result-page에서는 AuthStoreProvider가 없으므로 optional 사용
  const centerSn = useAuthStoreOptional((state) => state.centerSn, 0);
  const axiosInstance = isResultPage ? customUserAxios : customAxios;
  const apiPath = isResultPage
    ? `/users/${user_sn}/measurement/${measure_sn}/upper-lower-summary`
    : `/members/${user_sn}/centers/${centerSn}/measurement/${measure_sn}/upper-lower-summary`;

  return useQuery<MeasureSummary>({
    queryKey: isResultPage
      ? ["userResultMeasureSummary", measure_sn, user_sn]
      : ["measureSummary", measure_sn, user_sn, centerSn],
    queryFn: async () => {
      const response = await axiosInstance.get(apiPath);
      return isResultPage ? (response.data?.data || response.data) : response.data.data;
    },
    enabled:
      measure_sn !== undefined &&
      user_sn !== undefined &&
      (isResultPage || centerSn > 0),
  });
};