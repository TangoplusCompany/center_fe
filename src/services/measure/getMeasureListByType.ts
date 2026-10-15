import { customAxios, customUserAxios } from "@/lib/axios";
import { MeasureType } from "@/types/measure";

export type MeasureResultType = MeasureType;

export interface IGetMeasureListByTypeParams {
  type: MeasureType | string;
  page: string | number;
  limit: string | number;
  user_sn?: number;
  center_sn?: number;
  centerSn?: number;
  isMyPage?: boolean;
  from?: string;
  to?: string;
  sort?: string;
}

/**
 * 센터 측정 목록 조회 API
 * @param type 측정 타입 (basic | rom | moire | bia | gait)
 * @param page 페이지
 * @param limit 페이지 당 아이템 수
 * @param user_sn 유저 번호
 * @param center_sn 센터 번호
 * @param centerSn 센터 번호 (alias)
 * @param isMyPage result-page에서 사용하는지 여부
 * @param from 시작 날짜
 * @param to 종료 날짜
 * @param sort 정렬 순서
 * @returns 센터 측정 목록 조회 응답
 */
export const getMeasureListByType = async <T = unknown>({
  type,
  page,
  limit,
  user_sn,
  center_sn,
  centerSn,
  isMyPage = false,
  from,
  to,
  sort,
}: IGetMeasureListByTypeParams): Promise<T> => {
  const resolvedCenterSn = centerSn ?? center_sn;
  const axiosInstance = isMyPage ? customUserAxios : customAxios;
  const apiPath = isMyPage
    ? `/users/${user_sn}/measurement/result-list/${type}` // my.tangobody.co.kr의 사용자 측정 목록 end point
    : `/measurement/centers/${resolvedCenterSn}/members/${user_sn}/result-list/${type}`; // admin.tangobody.co.kr의 사용자 측정 목록 end point

  const params: Record<string, string> = {};

  if (isMyPage) {
    // result-page용 파라미터
    params.page = String(page);
    params.per_page = String(limit);

    if (from) {
      params.start_date = from;
    }

    if (to) {
      params.end_date = to;
    }

    if (sort) {
      params.sort = sort;
    }
  } else {
    // 관리자 페이지용 파라미터
    params.page = String(page);
    params.limit = String(limit);

    if (from) {
      params.from = from;
    }

    if (to) {
      params.to = to;
    }

    if (sort) {
      params.sort = sort;
    }
  }

  const response = await axiosInstance.get(apiPath, {
    params,
  });
  return response.data.data;
};