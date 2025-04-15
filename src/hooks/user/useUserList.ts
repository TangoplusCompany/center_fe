import { customAuthAxios } from "@/lib/axios";
import { IUserData } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export const useGetUserList = ({ nowPage }: { nowPage: number }) =>
  useQuery<IUserData[]>({
    queryKey: ["UserMain", nowPage],
    queryFn: async () => {
      const response = await customAuthAxios.get("/api/user", {});
      return response.data;
    },
  });
