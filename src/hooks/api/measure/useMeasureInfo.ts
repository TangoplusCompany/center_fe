import { customAxios, customUserAxios } from "@/lib/axios";
import { IMeasureResponse } from "@/types/measure";
import { useQuery } from "@tanstack/react-query";
import { useAuthStoreOptional } from "@/providers/AuthProvider";

// 1. 공통 응답 규격 인터페이스 정의
interface ApiResponse<T> {
  status: number;
  data: T;
  message?: string;
}

export type MeasureDetailData = IMeasureResponse & {
  isWrongMeasure: 0 | 1;
};
/**
 * 측정 상세 조회
 * @param measure_sn 측정 번호
 * @param user_sn 유저 번호
 * @param isMyPage result-page에서 사용하는지 여부
 * @returns 측정 상세 데이터
 */
export const useMeasureInfo = ({
  measure_sn,
  user_sn,
  isMyPage = false,
}: {
  measure_sn: number | undefined;
  user_sn: string;
  isMyPage?: boolean;
}) => {
  const centerSn = useAuthStoreOptional((state) => state.centerSn, 0);
  const axiosInstance = isMyPage ? customUserAxios : customAxios;
  const apiPath = isMyPage
    ? `/users/${user_sn}/measurement/${measure_sn}`
    : `/measurement/${measure_sn}/centers/${centerSn}/members/${user_sn}`;

  return useQuery<ApiResponse<IMeasureResponse>, Error, MeasureDetailData>({
    queryKey: isMyPage
      ? ["userResultMeasureDetail", measure_sn, user_sn]
      : ["measureDetail", measure_sn, user_sn, centerSn],
    queryFn: async () => {
      const response = isMyPage
        ? await axiosInstance.get<ApiResponse<IMeasureResponse>>(apiPath)
        : await axiosInstance.get<ApiResponse<IMeasureResponse>>(apiPath, {
            params: { user_sn },
          });
      return response.data;
    },
    select: (res): MeasureDetailData => {
      const isWrongMeasure: 0 | 1 = res.status === 428 ? 1 : 0;

      return {
        ...res.data,
        isWrongMeasure,
      };
    },
    enabled:
      measure_sn !== undefined &&
      user_sn !== undefined &&
      measure_sn !== 0 &&
      user_sn !== "" &&
      (isMyPage || centerSn > 0),
  });
};