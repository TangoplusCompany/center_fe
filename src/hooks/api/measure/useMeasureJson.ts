// hooks/useMeasureJson.ts
"use client";

import { getMeasureJson } from "@/app/actions/getMeasureJson";
import { IPoseLandmark } from "@/types/pose";
import { useEffect, useState } from "react";

/**
 * 정적 JSON 로딩 Hooks
 * @param jsonPath 측정 JSON 경로
 * @returns 측정 JSON 데이터, 로딩중, 에러상태
 */
export const useMeasureJson = (jsonPath?: string) => {
  const [data, setData] = useState<{ pose_landmark: IPoseLandmark[] }>();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!jsonPath) return;

    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getMeasureJson(jsonPath);
        setData(res);
      } catch (err) {
        setError(err as Error);
        console.error("측정 JSON 로딩 실패", err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [jsonPath]);

  return { data, isLoading, isError };
};
