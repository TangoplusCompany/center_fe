import { customAxios, customUserAxios } from "@/lib/axios";

export interface IGetUserMeasureListParams {
  page: string;
  limit: string;
  user_sn?: number;
  centerSn?: number;
  isMyPage?: boolean;
  from?: string;
  to?: string;
  sort?: string;
}

/**
 * 유저 측정 목록 조회 서비스 함수
 * - isMyPage: true → result-page(내 결과 페이지)용 엔드포인트/파라미터
 * - isMyPage: false → admin 페이지용 엔드포인트/파라미터
 */
export const getUserMeasureBasicList = async <T>({
  page,
  limit,
  user_sn,
  centerSn,
  isMyPage = false,
  from,
  to,
  sort,
}: IGetUserMeasureListParams): Promise<T> => {
  const axiosInstance = isMyPage ? customUserAxios : customAxios;
  const apiPath = isMyPage
    ? `/users/${user_sn}/measurement/basic-result-list`
    : `/measurement/centers/${centerSn}/members/${user_sn}/basic-result-list`; 

  const params: Record<string, string> = {};

  if (isMyPage) {
    params.page = page;
    params.per_page = limit;
    if (from) params.start_date = from;
    if (to) params.end_date = to;
    if (sort) params.sort = sort;
  } else {
    params.page = page;
    params.limit = limit;
    if (from) params.from = from;
    if (to) params.to = to;
    if (sort) params.sort = sort;
  }

  try {
    const response = await axiosInstance.get(apiPath, { params });
    return response.data.data;
  } catch (err) {
    throw err;
  }
};