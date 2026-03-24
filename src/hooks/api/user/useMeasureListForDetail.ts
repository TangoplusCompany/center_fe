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
  user_sn,
  isMyPage = false,
}: {
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
    user_sn: user_sn,
    isMyPage,
  });
  const filteredItems = useMemo(() => {
    if (!data?.measurement_list) return [];

    // return data.measurement_list.filter(
    //   (item) => item.measurement_type === "basic_only"
    // );
    return data?.measurement_list
  }, [data?.measurement_list]);
  
  const pagination: DetailPagination = useMemo(
    () => ({
      page: data?.current_page ?? 1,
      total: filteredItems.length,
      limit: data?.limit ?? Number(LIMIT),
      last_page: data?.total_pages ?? 1,
      setPage: (p: number) => setPage(Math.max(1, p)),
    }),
    [data?.current_page, filteredItems, data?.limit, data?.total_pages]
  );

  // measurement_list를 IMeasureList[]로 변환
  const measureList: IMeasureList[] = useMemo(() => {
    if (!filteredItems) return [];
    
    return filteredItems.map((item) => ({
      sn: item.measure_sn,
      measure_sn: item.measure_sn,
      user_name: item.user_name,
      device_name: item.device_name,
      measure_date: item.measure_date,
      mobile: item.mobile,
      user_sn: item.user_sn,
      user_uuid: "",
      device_sn: 0,
      has_basic: 0,
      has_rom: 0,
      measurement_type: "basic_only"
    }));
  }, [filteredItems]);

  return {
    data,
    isLoading,
    isError,
    measureList,
    pagination,
  };
};
