import { customAxios } from "@/lib/axios";

/**
 * 센터 측정 목록 조회 API
 * @param page 페이지
 * @param limit 페이지 당 아이템 수
 * @param deviceSn 기기 번호
 * @param search 검색어
 * @returns 센터 측정 목록 조회 응답
 */
export const getMeasureList = async ({
  page,
  limit,
  deviceSn,
  search,
}: {
  page?: number;
  limit?: number;
  deviceSn?: string;
  search?: string;
}) => {
  const params: Record<string, string | number> = {
    page: page || 1,
    limit: limit || 20,
  };
  if (search?.trim() && search !== "") {
    params.search = search;
  }
  if (deviceSn?.trim() && deviceSn !== "") {
    params.device_sn = deviceSn;
  }
  const { data } = await customAxios.get(`/measurement`, {
    params,
  });
  return data;
};
