import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/providers/AuthProvider";
import { getAnnouncements } from "@/services/announcement/getAnnouncements";

/**
 * 센터 관리자 목록 조회 Hooks
 * @param page 페이지
 * @param limit 페이지 당 관리자 수
 * @param search 검색어
 * @returns 센터 관리자 목록 조회 쿼리
 */
export const useGetAnnouncements = ({
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
    queryFn: () => getAnnouncements({ center_sn: centerSn }), 
    enabled: centerSn > 0,
  });
};
