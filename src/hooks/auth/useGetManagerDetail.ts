import { getCenterManagerDetail } from "@/services/center/getCenterManagerDetail";

import { useQuery } from "@tanstack/react-query";

export const useGetManagerDetail = ({ managerSn }: { managerSn: string }) => {
  return useQuery({
    queryKey: ["ManagerDetails", managerSn],
    queryFn: async () => await getCenterManagerDetail({ sn: managerSn }),
  });
};
