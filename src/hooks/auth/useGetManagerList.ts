import { getCenterManagers } from "@/services/center/getCenterManagers";
import { useQuery } from "@tanstack/react-query";

export const useGetManagerList = () => {
  return useQuery({
    queryKey: ["adminList"],
    queryFn: async () => await getCenterManagers(),
  });
};
