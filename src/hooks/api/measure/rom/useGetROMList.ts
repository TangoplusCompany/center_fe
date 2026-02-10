import { customUserAxios } from "@/lib/axios";
import { useAuthStore } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

/**
 * 유저 ROM 측정 목록 조회
 * @param page 페이지 번호
 * @param limit 페이지 당 측정 목록 개수
 * @param user_sn 유저 번호 (관리자 페이지용)
 * @param user_sn 유저 번호 (result-page용)
 * @param isResultPage result-page에서 사용하는지 여부
 * @param from 시작 날짜 (선택)
 * @param to 종료 날짜 (선택)
 * @param sort 정렬 순서 (asc/desc)
 * @returns 유저 측정 목록 데이터
 */
export const useGetUserROMList = <T>({
  page,
  limit,
  user_sn,
  part,
  from,
  to,
  sort,
}: {
  page: string;
  limit: string;
  // user_uuid?: string;
  user_sn?: number;
  part?: number;
  from?: string;
  to?: string;
  sort?: string;
}) => {
  const centerSn = useAuthStore((state) => state.centerSn);
  const axiosInstance = customUserAxios 
  const apiPath = `/users/${user_sn}/measurement/${part}`
  // TODO 이 곳에서 api 경로 바꿔야함
    

  return useQuery<T>({
    queryKey: ["userResultMeasureList", page, limit, user_sn, from, to, sort],
    queryFn: async () => {
      const params: Record<string, string> = {};
      
      // result-page용 파라미터
      params.page = page;
      params.per_page = limit;
      
      if (from) {
        params.start_date = from;
      }
      
      if (to) {
        params.end_date = to;
      }
      
      if (sort) {
        params.sort = sort;
      }

      const response = await axiosInstance.get(apiPath, {
        params,
      });
      return response.data.data;
    },
    enabled: user_sn !== undefined && (centerSn > 0),
  });
};