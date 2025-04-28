import { getCenterManagers } from "@/services/center/getCenterManagers";
import { useQuery } from "@tanstack/react-query";

export const useGetManagerList = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["adminList", page, limit],
    queryFn: async () => await getCenterManagers(),
  });
};
