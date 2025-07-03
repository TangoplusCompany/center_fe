import { getDeviceDetail } from "@/services/device/getDeviceDetail";
import { useQuery } from "@tanstack/react-query";

/**
 * 센터 기기 상세 조회 Hooks
 * @param sn 기기 번호
 * @returns 센터 기기 상세 조회 쿼리
 */
export const useGetDeviceDetail = <T>(sn: number) => {
  return useQuery<T>({
    queryKey: ["deviceDetail", sn],
    queryFn: async () => await getDeviceDetail({ sn }),
  });
};
