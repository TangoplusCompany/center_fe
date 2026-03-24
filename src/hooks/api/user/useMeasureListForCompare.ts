"use client";

import { useState, useMemo } from "react";
import { useGetUserMeasureList } from "./useGetUserMeasureList";
import { IUserMeasureList } from "@/types/user";

const LIMIT = "10";

export type ComparePagination = {
  page: number;
  total: number;
  limit: number;
  last_page: number;
  setPage: (page: number) => void;
};

/**
 * CompareMeasurePickerDialog 전용 훅.
 * - 페이지 state 관리, useGetUserMeasureList 연동
 * - 다이얼로그 페이지네이션 클릭 시 page 변경 → API 재요청
 * - 결과 팝업(useMeasureListForDetail)과 완전히 독립적으로 작동
 */
export const useMeasureListForCompare = ({
  // userUUID,
  user_sn,
  isMyPage = false,
}: {
  // userUUID?: string;
  user_sn?: number;
  isMyPage?: boolean;
}) => {
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isError,
  } = useGetUserMeasureList<IUserMeasureList>({
    page: String(page),
    limit: LIMIT,
    // user_uuid: userUUID,
    user_sn: user_sn,
    isMyPage,
  });
  const filteredItems = useMemo(() => {
    if (!data?.measurement_list) return [];
    return data.measurement_list.filter(
      (item) => item.measurement_type === "basic_only"
    );
  }, [data?.measurement_list]);

  const pagination: ComparePagination = useMemo(
    () => ({
      page,
      total: filteredItems.length,
      limit: data?.limit ?? Number(LIMIT),
      last_page: data?.total_pages ?? 1,
      setPage: (p: number) => setPage(Math.max(1, p)),
    }),
    [page, filteredItems, data?.limit, data?.total_pages]
  );


  return {
    isLoading,
    isError,
    measureList: filteredItems ?? [],
    pagination,
  };
};
