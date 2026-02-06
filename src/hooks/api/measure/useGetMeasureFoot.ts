import { customAxios, customUserAxios } from "@/lib/axios";
import { MeasureFootCOP } from "@/types/measure";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/providers/AuthProvider";

export const useGetMeasureFoot = ({
  measure_sn,
  user_sn,
  isResultPage = false,
}: {
  measure_sn: string | undefined;
  user_sn: string;
  isResultPage?: boolean;
}) => {
  const centerSn = useAuthStore((state) => state.centerSn);
  const axiosInstance = isResultPage ? customUserAxios : customAxios;
  const apiPath = isResultPage
    ? `/users/${user_sn}/measurement/${measure_sn}/foot-cop`
    : `/members/${user_sn}/centers/${centerSn}/measurement/${measure_sn}/foot-cop`;

  return useQuery<MeasureFootCOP>({
    queryKey: isResultPage
      ? ["userResultMeasureFootCOP", measure_sn, user_sn]
      : ["MeasureFootCOP", measure_sn, user_sn, centerSn],
    queryFn: async () => {
      const response = await axiosInstance.get(apiPath);
      return response.data.data;
    },
    enabled:
      measure_sn !== undefined &&
      user_sn !== undefined &&
      (isResultPage || centerSn > 0),
  });
};