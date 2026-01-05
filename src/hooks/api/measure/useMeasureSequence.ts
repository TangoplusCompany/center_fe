import { customAxios } from "@/lib/axios";
import { IUserMeasureSequence, IUserMeasureSequenceDynamic } from "@/types/measure";
import { useQuery } from "@tanstack/react-query";

/**
 * 측정 상세 조회
 * @param measure_sn 측정 번호
 * @param user_uuid 유저 고유 아이디
 * @returns 측정 상세 데이터
 */

type MeasureSequenceResponse<T extends number> = T extends 6
  ? IUserMeasureSequenceDynamic
  : IUserMeasureSequence;

  
export const useMeasureSequence = <T extends number>(
  measure_sn: string | undefined,
  user_sn: string,
  sequence_number: T
) => {
  return useQuery<MeasureSequenceResponse<T>>({
    queryKey: ["measureSequence", measure_sn, user_sn, sequence_number],
    queryFn: async () => {
      const response = await customAxios.get(
        `/measurement/${measure_sn}/members/${user_sn}/sequences/${sequence_number}`
      );
      return response.data.data;
    },
    enabled:
      measure_sn !== undefined &&
      user_sn !== undefined &&
      sequence_number !== undefined,
  });
};