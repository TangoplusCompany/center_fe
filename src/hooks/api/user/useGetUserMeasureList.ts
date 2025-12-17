import { customAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

/**
 * 유저 측정 목록 조회
 * @param page 페이지 번호
 * @param limit 페이지 당 측정 목록 개수
 * @param user_uuid 유저 고유 아이디
 * @returns 유저 측정 목록 데이터
 */
export const useGetUserMeasureList = <T>({
  page,
  limit,
  user_uuid,
  from,
  to
}: {
  page: string;
  limit: string;
  user_uuid: string;
  from?: string;
  to?: string;
}) =>
  useQuery<T>({
    queryKey: ["UserMeasureList", page, limit, user_uuid, from, to],
    queryFn: async () => {
      const params: Record<string, string> = {
        user_uuid,
        page,
        limit,
      };

      if (from) {
        params.from = from;
      }

      if (to) {
        params.to = to;
      }

      const response = await customAxios.get("/measurement/members", {
        params,
      });
      return response.data.data;
    },
  });