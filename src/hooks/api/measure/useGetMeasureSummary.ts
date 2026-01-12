import { customAxios } from "@/lib/axios";
import { MeasureSummary } from "@/types/measure";
import { useQuery } from "@tanstack/react-query";



export const useGetMeasureSummary = (
  measure_sn: string | undefined,
  user_sn: string,
) => {
  return useQuery<MeasureSummary>({
    queryKey: ["measureSummary", measure_sn, user_sn],
    queryFn: async () => {
      const response = await customAxios.get(
        `members/${user_sn}/measurement/${measure_sn}/upper-lower-summary`
      );
      return response.data.data;
    },
    enabled:
      measure_sn !== undefined &&
      user_sn !== undefined 
      
  });
};