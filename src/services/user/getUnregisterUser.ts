import { customAxios } from "@/lib/axios";

/**
 * 미등록 사용자 조회 API
 * @param center_sn 센터 번호
 * @param searchValue 검색어
 * @returns 미등록 사용자 조회 응답
 */
export const getUnregisterUser = async ({
  center_sn,
  searchValue,
}: {
  center_sn: number;
  searchValue: string;
}) => {
  const response = await customAxios.get(
    `/members/centers/${center_sn}/unregistered-users`,
    {
      params: {
        search: searchValue,
      },
    },
  );
  return response.data;
};
