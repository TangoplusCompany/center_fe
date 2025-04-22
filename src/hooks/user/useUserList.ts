import { customAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetUserList = <T>() =>
  useQuery<T>({
    queryKey: ["UserMain"],
    queryFn: async () => {
      const response = await customAxios.get("/members");
      return response.data.data;
    },
  });
