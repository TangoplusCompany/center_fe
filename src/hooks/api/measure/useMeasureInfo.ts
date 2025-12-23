import { customAxios } from "@/lib/axios";
import { IUserMeasureInfoResponse } from "@/types/measure";
import { useQuery } from "@tanstack/react-query";

/**
 * 측정 상세 조회
 * @param measure_sn 측정 번호
 * @param user_uuid 유저 고유 아이디
 * @returns 측정 상세 데이터
 */
export const useMeasureInfo = (measure_sn: number | undefined, user_sn: string) => {
  return useQuery<IUserMeasureInfoResponse>({
    queryKey: ["measureDetail", measure_sn, user_sn],
    queryFn: async () => {
      const response = await customAxios.get(`/measurement/${measure_sn}/members/${user_sn}`, {
        params: {
          user_sn,
        },
      });
      return response.data.data;
    },
    enabled: measure_sn !== undefined && user_sn !== undefined && measure_sn !== 0
  });
};
