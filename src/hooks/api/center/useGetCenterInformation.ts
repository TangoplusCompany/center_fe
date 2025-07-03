import { getCenterInformation } from "@/services/center/getCenterInformation";
import { useQuery } from "@tanstack/react-query";

/**
 * 센터 정보 조회 Hooks
 * @returns 센터 정보 조회 쿼리
 */
export const useGetCenterInformation = () => {
  return useQuery({
    queryKey: ["getCenterInformation"],
    queryFn: getCenterInformation,
  });
};
