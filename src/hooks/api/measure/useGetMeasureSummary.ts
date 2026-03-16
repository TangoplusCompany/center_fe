import { customAxios, customUserAxios } from "@/lib/axios";
import { MeasureSummary } from "@/types/measure";
import { useQuery } from "@tanstack/react-query";
import { useAuthStoreOptional } from "@/providers/AuthProvider";

export const useGetMeasureSummary = ({
  measure_sn,
  user_sn,
  isMyPage = false,
}: {
  measure_sn: string | undefined;
  user_sn: string;
  isMyPage?: boolean;
}) => {
  // result-page에서는 AuthStoreProvider가 없으므로 optional 사용
  const centerSn = useAuthStoreOptional((state) => state.centerSn, 0);
  const axiosInstance = isMyPage ? customUserAxios : customAxios;
  const apiPath = isMyPage
    ? `/users/${user_sn}/measurement/${measure_sn}/upper-lower-summary`
    : `/members/${user_sn}/centers/${centerSn}/measurement/${measure_sn}/upper-lower-summary`;

  return useQuery<MeasureSummary>({
    queryKey: isMyPage
      ? ["userResultMeasureSummary", measure_sn, user_sn]
      : ["measureSummary", measure_sn, user_sn, centerSn],
    queryFn: async () => {
      const response = await axiosInstance.get(apiPath);
      return isMyPage ? (response.data?.data || response.data) : response.data.data;
    },
    enabled:
      measure_sn !== undefined &&
      user_sn !== undefined &&
      (isMyPage || centerSn > 0),
  });
};