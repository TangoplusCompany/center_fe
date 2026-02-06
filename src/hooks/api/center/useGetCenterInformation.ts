import { getCenterInformation } from "@/services/center/getCenterInformation";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/providers/AuthProvider";

/**
 * 센터 정보 조회 Hooks
 * @returns 센터 정보 조회 쿼리
 */
export const useGetCenterInformation = () => {
  const centerSn = useAuthStore((state) => state.centerSn);

  return useQuery({
    queryKey: ["getCenterInformation", centerSn],
    queryFn: () => getCenterInformation(centerSn),
    enabled: centerSn > 0,
  });
};
