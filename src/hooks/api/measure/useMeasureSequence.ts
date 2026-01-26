import { customAxios, customUserAxios } from "@/lib/axios";
import { IUserMeasureSequence, IUserMeasureSequenceDynamic } from "@/types/measure";
import { useQuery } from "@tanstack/react-query";

/**
 * 측정 시퀀스 조회
 * @param measure_sn 측정 번호
 * @param user_sn 유저 번호
 * @param sequence_number 시퀀스 번호
 * @param isResultPage result-page에서 사용하는지 여부
 * @returns 측정 시퀀스 데이터
 */

type MeasureSequenceResponse<T extends number> = T extends 6
  ? IUserMeasureSequenceDynamic
  : IUserMeasureSequence;

  
export const useMeasureSequence = <T extends number>({
  measure_sn,
  user_sn,
  sequence_number,
  isResultPage = false,
}: {
  measure_sn: string | undefined;
  user_sn: string;
  sequence_number: T;
  isResultPage?: boolean;
}) => {
  const axiosInstance = isResultPage ? customUserAxios : customAxios;
  const apiPath = isResultPage
    ? `/users/${user_sn}/measurement/${measure_sn}/sequences/${sequence_number}`
    : `/measurement/${measure_sn}/members/${user_sn}/sequences/${sequence_number}`;

  return useQuery<MeasureSequenceResponse<T>>({
    queryKey: isResultPage
      ? ["userResultMeasureSequence", measure_sn, user_sn, sequence_number]
      : ["measureSequence", measure_sn, user_sn, sequence_number],
    queryFn: async () => {
      const response = await axiosInstance.get(apiPath);
      return response.data.data;
    },
    enabled:
      measure_sn !== undefined &&
      user_sn !== undefined &&
      sequence_number !== undefined,
  });
};