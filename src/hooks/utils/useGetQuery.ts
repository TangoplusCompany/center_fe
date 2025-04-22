"use client";

import { useParams, usePathname, useSearchParams } from "next/navigation";

export const useGetQuery = () => {
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams(); // 읽기 전용
  const query: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    query[key] = value;
  }

  return {
    pathname,
    params,
    query,
  };
};
