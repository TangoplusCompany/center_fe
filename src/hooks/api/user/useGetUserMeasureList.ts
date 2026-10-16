import { useQuery } from "@tanstack/react-query";
import { useAuthStoreOptional } from "@/providers/AuthProvider";
import {
  getUserMeasureList,
} from "@/services/user/getUserMeasureList";

export interface IUseGetUserMeasureListProps {
  page: string | number;
  limit: string | number;
  user_sn?: number;
  isMyPage?: boolean;
  from?: string;
  to?: string;
  sort?: string;
}

/**
 * 유저 측정 목록 조회 Hooks
 * @param page 페이지 번호
 * @param limit 페이지 당 측정 목록 개수
 * @param user_sn 유저 번호 (관리자 페이지용 / result-page용)
 * @param isMyPage result-page에서 사용하는지 여부
 * @param from 시작 날짜 (선택)
 * @param to 종료 날짜 (선택)
 * @param sort 정렬 순서 (asc/desc)
 * @returns 유저 측정 목록 데이터
 */
export const useGetUserMeasureList = <T>({
  page,
  limit,
  user_sn,
  isMyPage = false,
  from,
  to,
  sort,
}: IUseGetUserMeasureListProps) => {
  // result-page에서는 AuthStoreProvider가 없으므로 optional 사용
  const centerSn = useAuthStoreOptional((state) => state.centerSn, 0);

  return useQuery<T>({
    queryKey: isMyPage
      ? ["userResultMeasureList", String(page), String(limit), user_sn, from, to, sort]
      : ["UserMeasureList", String(page), String(limit), user_sn, from, to, sort, centerSn],
    queryFn: () =>
      getUserMeasureList<T>({
        page,
        limit,
        user_sn,
        centerSn,
        isMyPage,
        from,
        to,
        sort,
      }),
    enabled: user_sn !== undefined && (isMyPage || centerSn > 0),
  });
};