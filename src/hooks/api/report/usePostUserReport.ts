import { postUserReport } from "@/services/report/postUserReport";
import { useQuery } from "@tanstack/react-query";

/**
 * 사용자 측정 보고서 생성 Hooks
 * @param user_uuid 사용자 UUID
 * @param sn 기기 번호
 * @returns 사용자 측정 보고서 생성 쿼리
 */
export const usePostUserReport = (user_uuid: string, sn: number) => {
  return useQuery({
    queryKey: ["postUserReport", user_uuid, sn],
    queryFn: () => postUserReport({ user_uuid, sn }),
    enabled: !!user_uuid && !!sn,
  });
};
