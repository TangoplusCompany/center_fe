import { customAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetLatestMeasureUser = <T>() =>
  useQuery<T>({
    queryKey: ["UserMeasureLatest"],
    queryFn: async () => {
      const { data } = await customAxios.get("/members/measurement/latest");
      return data.data;
    },
  });
