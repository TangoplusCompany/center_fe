// hooks/usePagination.ts
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

type QueryParams = Record<string, string>;
type QueryParamValue = string | number;
type QueryParamEntry = [string, QueryParamValue];

type SetQueryParamFn = {
  (key: string, value: QueryParamValue): void;
  (entries: QueryParamEntry[]): void;
};
type RemoveQueryParamFn = (key: string) => void;

/**
 * @query: 쿼리 파라미터를 읽기 위한 객체
 * @setQueryParam: 쿼리 파라미터를 설정하기 위한 함수
 * @removeQueryParam: 쿼리 파라미터를 삭제하기 위한 함수
 * @example const { query, setQueryParam } = useQueryParams();
  const page = Number(query.page || 1);

  return (
    <button onClick={() => setQueryParam("page", page + 1)}>다음</button>
  );
 * @returns 
 */
export const useQueryParams = (): {
  query: QueryParams;
  setQueryParam: SetQueryParamFn;
  removeQueryParam: RemoveQueryParamFn;
} => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 읽기
  const query: QueryParams = {};
  for (const [key, value] of searchParams.entries()) {
    query[key] = value;
  }

  // 쓰기
  const setQueryParam: SetQueryParamFn = (keyOrEntries: any, value?: any) => {
    const newParams = new URLSearchParams(searchParams.toString());
  
    if (Array.isArray(keyOrEntries)) {
      // 여러 개 세팅
      keyOrEntries.forEach(([key, val]) => {
        newParams.set(key, String(val));
      });
    } else {
      // 기존 단일 세팅
      newParams.set(keyOrEntries, String(value));
    }
  
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  // 삭제
  const removeQueryParam = (key: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete(key);
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  return { query, setQueryParam, removeQueryParam };
};
