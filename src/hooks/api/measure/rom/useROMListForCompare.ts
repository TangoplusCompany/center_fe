import { IMeasureROMData, IMeasureROMUnitWithDate } from "@/types/measure";
import { useMemo, useState } from "react";
import { useGetUserROMList } from "./useGetROMList";
import { ComparePagination } from "../../user/useMeasureListForCompare";

/**
 * CompareMeasurePickerDialog 전용 훅.
 * - 페이지 state 관리, useGetUserMeasureList 연동
 * - 다이얼로그 페이지네이션 클릭 시 page 변경 → API 재요청
 * - 결과 팝업(useMeasureListForDetail)과 완전히 독립적으로 작동
 */

const LIMIT = "10";

export const useROMListForCompare = ({
  user_sn,
  part,
}: {
  user_sn?: number;
  part?: number;
}) => {
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isError,
  } = useGetUserROMList<IMeasureROMData>({
    page: String(page),
    limit: LIMIT,
    user_sn: user_sn,
    part:part

  });

  // measure_list 객체를 배열로 변환 (날짜 포함)
  const measureList: IMeasureROMUnitWithDate[] = useMemo(() => {
    if (!data?.measure_list) return [];
    return Object.entries(data.measure_list).map(([date, unit]) => ({
      ...unit,
      date, // 날짜 추가
    }));
  }, [data?.measure_list]);

  const pagination: ComparePagination = useMemo(
    () => ({
      page,
      total: data?.total ?? 0,
      limit: Number(LIMIT),
      last_page: Math.ceil((data?.total ?? 0) / Number(LIMIT)),
      setPage: (p: number) => setPage(Math.max(1, p)),
    }),
    [page, data?.total]
  );

  return {
    isLoading,
    isError,
    measureList, // IMeasureROMUnitWithDate[] 배열
    pagination,
  };
};