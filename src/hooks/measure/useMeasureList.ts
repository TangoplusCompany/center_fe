import { getMeasureList } from "@/services/measure/getMeasureList";
import { useQuery } from "@tanstack/react-query";

interface IUseMeasureListProps {
  page?: number;
  limit?: number;
  deviceSn?: string;
  search?: string;
}

export const useMeasureList = <T>(params: IUseMeasureListProps) => {
  return useQuery<T>({
    queryKey: ["measureList", params],
    queryFn: async () => {
      const response = await getMeasureList(params);
      return response.data;
    },
  });
};
