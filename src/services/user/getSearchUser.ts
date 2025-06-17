import { customAxios } from "@/lib/axios";

/**
 * 사용자 검색 API
 * @param searchValue 검색어
 * @returns 사용자 검색 응답
 */
export const getSearchUser = async ({
  searchValue,
}: {
  searchValue: string;
}) => {
  const response = await customAxios.get(`/members/search`, {
    params: {
      value: searchValue,
    },
  });
  return response.data;
};
