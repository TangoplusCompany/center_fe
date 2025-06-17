import { getCenterManagers } from "@/services/center/getCenterManagers";
import { useQuery } from "@tanstack/react-query";

/**
 * 센터 관리자 목록 조회 Hooks
 * @param page 페이지
 * @param limit 페이지 당 관리자 수
 * @returns 센터 관리자 목록 조회 쿼리
 */
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
