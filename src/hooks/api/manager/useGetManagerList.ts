import { getCenterManagers } from "@/services/center/getCenterManagers";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/providers/AuthProvider";

/**
 * 센터 관리자 목록 조회 Hooks
 * @param page 페이지
 * @param limit 페이지 당 관리자 수
 * @param search 검색어
 * @returns 센터 관리자 목록 조회 쿼리
 */
export const useGetManagerList = ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const centerSn = useAuthStore((state) => state.centerSn);

  return useQuery({
    queryKey: ["adminList", page, limit, search, centerSn],
    queryFn: () => getCenterManagers({ center_sn: centerSn, search }),
    enabled: centerSn > 0,
  });
};
