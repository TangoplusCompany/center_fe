import { customAxios } from "@/lib/axios";

/**
 * 사용자 목록 조회 API
 * @param center_sn 센터 번호
 * @param page 페이지
 * @param limit 페이지 당 아이템 수
 * @param search 검색어
 * @returns 사용자 목록 조회 응답
 */
export const getUserList = async ({
  center_sn,
  page,
  limit,
  search,
}: {
  center_sn: number;
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const params: Record<string, string | number> = {
    page: page || 1,
    limit: limit || 20,
  };
  if (search?.trim() && search !== "") {
    params.search = search;
  }
  const { data } = await customAxios.get(`/members/centers/${center_sn}`, {
    params,
  });
  return data;
};
