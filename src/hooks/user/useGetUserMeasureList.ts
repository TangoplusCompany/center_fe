import { customAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetUserMeasureList = <T>({
  page,
  limit,
  user_uuid,
}: {
  page: string;
  limit: string;
  user_uuid: string;
}) =>
  useQuery<T>({
    queryKey: ["UserMeasureList", page, limit, user_uuid],
    queryFn: async () => {
      const response = await customAxios.get("/measurement/members", {
        params: {
          user_uuid,
          page,
          limit,
        },
      });
      return response.data.data;
    },
  });
