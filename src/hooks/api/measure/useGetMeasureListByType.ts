import { useQuery } from "@tanstack/react-query";
import { useAuthStoreOptional } from "@/providers/AuthProvider";
import {
  getMeasureListByType,
} from "@/services/measure/getMeasureListByType";
import { MeasureType } from "@/types/measure";

export interface IUseGetMeasureListByTypeProps {
  type: MeasureType | string;
  page: string | number;
  limit: string | number;
  user_sn?: number;
  isMyPage?: boolean;
  from?: string;
  to?: string;
  sort?: string;
  enabled?: boolean;
}

/**
 * 타입별 유저 측정 결과 목록 조회 Hooks
 * @param type 측정 타입 ("basic" | "rom" | "moire" | "bia" | "gait")
 * @param page 페이지 번호
 * @param limit 페이지 당 개수
 * @param user_sn 유저 번호
 * @param isMyPage result-page(내 결과 페이지)용 여부
 * @param from 시작 날짜
 * @param to 종료 날짜
 * @param sort 정렬 순서
 * @returns 타입별 유저 측정 결과 목록 쿼리
 */
export const useGetMeasureListByType = <T>({
  type,
  page,
  limit,
  user_sn,
  isMyPage = false,
  from,
  to,
  sort,
  enabled = true,
}: IUseGetMeasureListByTypeProps) => {
  const centerSn = useAuthStoreOptional((state) => state.centerSn, 0);

  return useQuery<T>({
    queryKey: isMyPage
      ? [
          "userResultMeasureListByType",
          type,
          String(page),
          String(limit),
          user_sn,
          from,
          to,
          sort,
        ]
      : [
          "UserMeasureListByType",
          type,
          String(page),
          String(limit),
          user_sn,
          from,
          to,
          sort,
          centerSn,
        ],
    queryFn: () =>
      getMeasureListByType<T>({
        type: type,
        page,
        limit,
        user_sn,
        centerSn,
        isMyPage,
        from,
        to,
        sort,
      }),
    enabled:
      enabled &&
      user_sn !== undefined &&
      (isMyPage || centerSn > 0) &&
      !!type,
  });
};

