import { customAxios } from "@/lib/axios";

/**
 * 미등록 사용자 조회 API
 * @param searchValue 검색어
 * @returns 미등록 사용자 조회 응답
 */
export const getUnregisterUser = async ({
  searchValue,
}: {
  searchValue: string;
}) => {
  const response = await customAxios.get(`/members/unregistered-users`, {
    params: {
      search: searchValue,
    },
  });
  return response.data;
};
