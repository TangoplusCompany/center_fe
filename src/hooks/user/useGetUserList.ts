import { customAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetUserList = <T>({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) =>
  useQuery<T>({
    queryKey: ["CenterUserList"],
    queryFn: async () => {
      const response = await customAxios.get("/members", {
        params: {
          page,
          limit,
        },
      });
      return response.data.data;
    },
  });
