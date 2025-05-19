import { getUserList } from "@/services/user/getUserList";
import { useQuery } from "@tanstack/react-query";

interface IUseUserListProps {
  page?: number;
  limit?: number;
  search?: string;
}

export const useGetUserList = <T>(params: IUseUserListProps) =>
  useQuery<T>({
    queryKey: ["CenterUserList", params],
    queryFn: async () => {
      const response = await getUserList(params);
      return response.data;
    },
  });
