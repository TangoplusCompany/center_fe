import { useQuery } from "@tanstack/react-query";
import { customAxios, customUserAxios } from "@/lib/axios";
import { useAuthStoreOptional } from "@/providers/AuthProvider";

/**
 * 사용자 측정 데이터 JSON GET Hooks
 * @param user_sn 사용자 번호
 * @param isMyPage result-page에서 사용하는지 여부
 * @returns 사용자 측정 데이터 JSON GET 쿼리
 */
export const useGetUserDashboard = <T>({
  user_sn,
  isMyPage = false,
}: {
  user_sn: number | undefined;
  isMyPage?: boolean;
}) => {
  // result-page에서는 AuthStoreProvider가 없으므로 optional 사용
  const centerSn = useAuthStoreOptional((state) => state.centerSn, 0);
  const axiosInstance = isMyPage ? customUserAxios : customAxios;
  const apiPath = isMyPage
    ? `/users/${user_sn}/measure-summary`
    : `/members/${user_sn}/centers/${centerSn}/measure-summary`;

  return useQuery<T>({
    queryKey: isMyPage
      ? ["userResultMeasureSummary", user_sn]
      : ["userMeasureSummary", user_sn, centerSn],
    queryFn: async () => {
      const response = await axiosInstance.get(apiPath);
      return response.data.data;
    },
    enabled:
      user_sn !== undefined &&
      user_sn !== 0 &&
      (isMyPage || centerSn > 0),
  });
};
