import { customAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetLatestAddUser = <T>() =>
  useQuery<T>({
    queryKey: ["UserAddLatest"],
    queryFn: async () => {
      const { data } = await customAxios.get("/members/latest");
      return data.data;
    },
  });
