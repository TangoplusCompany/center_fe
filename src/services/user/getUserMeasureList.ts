import { customAxios, customUserAxios } from "@/lib/axios";

export interface IGetUserMeasureListParams {
  page: string | number;
  limit: string | number;
  user_sn?: number;
  centerSn?: number;
  center_sn?: number;
  isMyPage?: boolean;
  from?: string;
  to?: string;
  sort?: string;
}

/**
 * 유저 측정 목록 조회 API
 * @param page 페이지 번호
 * @param limit 페이지 당 개수
 * @param user_sn 유저 번호
 * @param centerSn 센터 번호 (관리자용)
 * @param center_sn 센터 번호 (관리자용 alias)
 * @param isMyPage result-page(내 결과 페이지)용 여부
 * @param from 시작 날짜
 * @param to 종료 날짜
 * @param sort 정렬 순서
 * @returns 측정 목록 데이터
 */
export const getUserMeasureList = async <T = unknown>({
  page,
  limit,
  user_sn,
  centerSn,
  center_sn,
  isMyPage = false,
  from,
  to,
  sort,
}: IGetUserMeasureListParams): Promise<T> => {
  const resolvedCenterSn = centerSn ?? center_sn;
  const axiosInstance = isMyPage ? customUserAxios : customAxios;
  const apiPath = isMyPage
    ? `/users/${user_sn}/measurement`
    : `/measurement/centers/${resolvedCenterSn}/members/${user_sn}`;

  const params: Record<string, string> = {};

  if (isMyPage) {
    // result-page용 파라미터
    params.page = String(page);
    params.per_page = String(limit);
    if (from) params.start_date = from;
    if (to) params.end_date = to;
    if (sort) params.sort = sort;
  } else {
    // 관리자 페이지용 파라미터
    params.page = String(page);
    params.limit = String(limit);
    if (from) params.from = from;
    if (to) params.to = to;
    if (sort) params.sort = sort;
  }

  const response = await axiosInstance.get(apiPath, {
    params,
  });
  return response.data.data;
};

