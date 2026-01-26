import { customAxios, customUserAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

/**
 * 유저 측정 목록 조회
 * @param page 페이지 번호
 * @param limit 페이지 당 측정 목록 개수
 * @param user_sn 유저 번호 (관리자 페이지용)
 * @param user_sn 유저 번호 (result-page용)
 * @param isResultPage result-page에서 사용하는지 여부
 * @param from 시작 날짜 (선택)
 * @param to 종료 날짜 (선택)
 * @returns 유저 측정 목록 데이터
 */
export const useGetUserMeasureList = <T>({
  page,
  limit,
  // user_uuid,
  user_sn,
  isResultPage = false,
  from,
  to,
}: {
  page: string;
  limit: string;
  // user_uuid?: string;
  user_sn?: number;
  isResultPage?: boolean;
  from?: string;
  to?: string;
}) => {
  const axiosInstance = isResultPage ? customUserAxios : customAxios;
  const apiPath = isResultPage
    ? `/users/${user_sn}/measurement`
    : `/measurement/members/${user_sn}`;

  return useQuery<T>({
    queryKey: isResultPage
      ? ["userResultMeasureList", page, limit, user_sn, from, to]
      : ["UserMeasureList", page, limit, user_sn, from, to],
    queryFn: async () => {
      const params: Record<string, string> = {
        page,
        limit,
      };

      if (from) {
        params.from = from;
      }

      if (to) {
        params.to = to;
      }

      const response = await axiosInstance.get(apiPath, {
        params,
      });
      return response.data.data;
    },
    enabled: user_sn !== undefined,
  });
};