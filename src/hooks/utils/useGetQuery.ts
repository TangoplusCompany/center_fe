"use client";

import { parseSearchParams } from "@/lib/parseSearchParams";
import { useParams, usePathname, useSearchParams } from "next/navigation";

/**
 * 쿼리 파라미터 조회 Hooks
 * @returns 쿼리 파라미터
 */
export const useGetQuery = () => {
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams(); // 읽기 전용
  const query: Record<string, string> = parseSearchParams(searchParams);

  return {
    pathname,
    params,
    query,
  };
};
