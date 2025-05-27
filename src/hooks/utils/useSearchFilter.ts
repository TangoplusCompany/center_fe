import { useQueryParams } from "./useQueryParams";

export const useSearchFilter = () => {
  const { setQueryParam } = useQueryParams();

  const applyFilter = (key: string, value: string) => {
    setQueryParam(key, value);
    setQueryParam("page", 1); // ✅ 필터 변경 시 page 초기화
  };

  return { applyFilter };
};
