import { customAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

/**
 * 측정 상세 조회
 * @param measure_sn 측정 번호
 * @param user_uuid 유저 고유 아이디
 * @returns 측정 상세 데이터
 */
export const useMeasureDetail = <T>(measure_sn: number, user_uuid: string) => {
  return useQuery<T>({
    queryKey: ["measureDetail", measure_sn, user_uuid],
    queryFn: async () => {
      const response = await customAxios.get(`/measurement/${measure_sn}`, {
        params: {
          user_uuid,
        },
      });
      return response.data.data;
    },
    enabled: measure_sn !== undefined && user_uuid !== undefined && measure_sn !== 0
  });
};
