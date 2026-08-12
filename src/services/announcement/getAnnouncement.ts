import { customAxios } from "@/lib/axios";
/**
 * 공지사항 조회 API
 * @param center_sn 센터 번호
 * @param search 검색어
 * @returns 센터 관리자 목록 조회 응답
 */
export const getAnnouncement = async ({
  sn,
  centerSn,
}: {
  sn: number;
  centerSn: number;
}) => {
  const response = await customAxios.get(`/announcements/${sn}/centers/${centerSn}`);
  return response.data.data;
};
