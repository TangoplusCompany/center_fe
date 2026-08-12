import { useState, useMemo } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useAuthStoreOptional } from "@/providers/AuthProvider";
import { getUserMeasureBasicList } from "@/services/user/getUserMeasureBasicList";
import { IUserMeasureListItem } from "@/types/user";

const DEFAULT_LIMIT = "10"; // 기본 페이지당 개수

export interface ComparePagination {
  page: number;
  total: number;
  limit: number;
  last_page: number;
  setPage: (p: number) => void;
}

export interface IUserMeasureBasicList {
  measurement_list: IUserMeasureListItem[];
  limit?: number;
  total?: number;
  total_pages?: number;
}

export const useGetUserMeasureBasicList = ({
  user_sn,
  isMyPage = false,
  from,
  to,
  sort,
  limit = DEFAULT_LIMIT,
}: {
  user_sn?: number;
  isMyPage?: boolean;
  from?: string;
  to?: string;
  sort?: string;
  limit?: string;
}) => {
  const [page, setPage] = useState(1);
  const centerSn = useAuthStoreOptional((state) => state.centerSn, 0);

  const { data, isLoading, isError } = useQuery<IUserMeasureBasicList>({
    queryKey: isMyPage
      ? ["userResultMeasureList", page, limit, user_sn, from, to, sort]
      : ["UserMeasureList", page, limit, user_sn, from, to, sort, centerSn],
    queryFn: () =>
      getUserMeasureBasicList<IUserMeasureBasicList>({
        page: String(page),
        limit,
        user_sn,
        centerSn,
        isMyPage,
        from,
        to,
        sort,
      }),
    enabled: user_sn !== undefined && (isMyPage || centerSn > 0),
    placeholderData: keepPreviousData,
  });
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const measureList: IUserMeasureListItem[] = data?.measurement_list ?? [];
  const pagination: ComparePagination = useMemo(
    () => ({
      page,
      total: measureList.length,
      limit: data?.limit ?? Number(limit),
      last_page: data?.total_pages ?? 1,
      setPage: (p: number) => setPage(Math.max(1, p)),
    }),
    [page, measureList, data?.limit, data?.total_pages, limit]
  );

  return { measureList, pagination, isLoading, isError };
};