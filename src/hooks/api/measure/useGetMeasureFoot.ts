import { customAxios } from "@/lib/axios";
import { MeasureFootCOP } from "@/types/measure";
import { useQuery } from "@tanstack/react-query";



export const useGetMeasureFoot = (
  measure_sn: string | undefined,
  user_sn: string,
) => {
  return useQuery<MeasureFootCOP>({
    queryKey: ["MeasureFootCOP", measure_sn, user_sn],
    queryFn: async () => {
      const response = await customAxios.get(
        `members/${user_sn}/measurement/${measure_sn}/foot-cop`
      );
      return response.data.data;
    },
    enabled:
      measure_sn !== undefined &&
      user_sn !== undefined 
  });
};