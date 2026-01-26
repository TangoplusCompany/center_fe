import { customAxios, customUserAxios } from "@/lib/axios";
import { IUserMeasureInfoResponse } from "@/types/measure";
import { useQuery } from "@tanstack/react-query";

/**
 * 측정 상세 조회
 * @param measure_sn 측정 번호
 * @param user_sn 유저 번호
 * @param isResultPage result-page에서 사용하는지 여부
 * @returns 측정 상세 데이터
 */
export const useMeasureInfo = ({
  measure_sn,
  user_sn,
  isResultPage = false,
}: {
  measure_sn: number | undefined;
  user_sn: string;
  isResultPage?: boolean;
}) => {
  const axiosInstance = isResultPage ? customUserAxios : customAxios;
  const apiPath = isResultPage
    ? `/users/${user_sn}/measurement/${measure_sn}`
    : `/measurement/${measure_sn}/members/${user_sn}`;

  return useQuery<IUserMeasureInfoResponse>({
    queryKey: isResultPage
      ? ["userResultMeasureDetail", measure_sn, user_sn]
      : ["measureDetail", measure_sn, user_sn],
    queryFn: async () => {
      const response = isResultPage
        ? await axiosInstance.get(apiPath)
        : await axiosInstance.get(apiPath, {
        params: {
          user_sn,
        },
      });
      return response.data.data;
    },
    enabled: measure_sn !== undefined && user_sn !== undefined && measure_sn !== 0 && user_sn !== "",
  });
};
