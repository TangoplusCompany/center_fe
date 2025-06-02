"use client";

import { parseSearchParams } from "@/lib/parseSearchParams";
import { useParams, usePathname, useSearchParams } from "next/navigation";

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
