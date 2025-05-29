import { postUserReport } from "@/services/report/postUserReport";
import { useQuery } from "@tanstack/react-query";

export const usePostUserReport = (user_uuid: string, sn: number) => {
  return useQuery({
    queryKey: ["postUserReport", user_uuid, sn],
    queryFn: () => postUserReport({ user_uuid, sn }),
    enabled: !!user_uuid && !!sn,
  });
};
