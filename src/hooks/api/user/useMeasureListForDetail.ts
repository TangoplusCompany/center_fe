"use client";

import { useState, useMemo } from "react";
import { useGetUserMeasureList } from "./useGetUserMeasureList";
import { IUserMeasureList } from "@/types/user";

const LIMIT = "5";

export type DetailPagination = {
  page: number;
  total: number;
  limit: number;
  last_page: number;
  setPage: (page: number) => void;
};

/**
 * MeasureDetail(탭 0 TODAY) + MeasureDetailDatePickerDialog 전용 훅.
 * - 페이지 state 관리, useGetUserMeasureList 연동
 * - 다이얼로그 페이지네이션 클릭 시 page 변경 → API 재요청
 */
export const useMeasureListForDetail = (userUUID: string) => {
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isError,
  } = useGetUserMeasureList<IUserMeasureList>({
    page: String(page),
    limit: LIMIT,
    user_uuid: userUUID,
  });

  const pagination: DetailPagination = useMemo(
    () => ({
      page,
      total: data?.total ?? 0,
      limit: data?.limit ?? Number(LIMIT),
      last_page: data?.last_page ?? 1,
      setPage: (p: number) => setPage(Math.max(1, p)),
    }),
    [page, data?.total, data?.limit, data?.last_page]
  );

  return {
    data,
    isLoading,
    isError,
    measureList: data?.measurements ?? [],
    pagination,
  };
};
