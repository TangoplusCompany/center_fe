import { useQueryParams } from "./useQueryParams";

/**
 * 검색 필터 적용 훅
 * @returns 검색 필터 적용 함수
 */
export const useSearchFilter = () => {
  const { setQueryParam } = useQueryParams();

  const applyFilter = (key: string, value: string) => {
    setQueryParam(key, value);
    setQueryParam("page", 1); // ✅ 필터 변경 시 page 초기화
  };

  return { applyFilter };
};
