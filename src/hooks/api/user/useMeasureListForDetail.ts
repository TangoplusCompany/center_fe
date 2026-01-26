"use client";

import { useState, useMemo } from "react";
import { useGetUserMeasureList } from "./useGetUserMeasureList";
import { IUserMeasureList } from "@/types/user";
import { IMeasureList } from "@/types/measure";

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
export const useMeasureListForDetail = ({
  // userUUID,
  user_sn,
  isResultPage = false,
}: {
  // userUUID?: string;
  user_sn?: number;
  isResultPage?: boolean;
}) => {
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isError,
  } = useGetUserMeasureList<IUserMeasureList>({
    page: String(page),
    limit: LIMIT,
    user_sn: user_sn,
    isResultPage,
  });

  const pagination: DetailPagination = useMemo(
    () => ({
      page: data?.current_page ?? 1,
      total: data?.total ?? 0,
      limit: data?.per_page ?? Number(LIMIT),
      last_page: data?.total_pages ?? 1,
      setPage: (p: number) => setPage(Math.max(1, p)),
    }),
    [data?.current_page, data?.total, data?.per_page, data?.total_pages]
  );

  // measurement_list를 IMeasureList[]로 변환
  const measureList: IMeasureList[] = useMemo(() => {
    if (!data?.measurement_list) return [];
    
    return data.measurement_list.map((item) => ({
      sn: item.measure_sn,
      measure_sn: item.measure_sn,
      user_name: item.user_name,
      device_name: item.device_name,
      measure_date: item.measure_date,
      mobile: item.mobile,
      user_sn: item.user_sn,
      user_uuid: "",
      device_sn: 0,
      t_score: 0,
    }));
  }, [data?.measurement_list]);

  return {
    data,
    isLoading,
    isError,
    measureList,
    pagination,
  };
};
