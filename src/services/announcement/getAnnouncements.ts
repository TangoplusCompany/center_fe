import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";
import { IAnnouncements } from "@/types/announcement";

type NoticeListResponse = {
  data: IAnnouncements;
} & IResponseDefault;

/**
 * 공지사항 조회 API
 * @param center_sn 센터 번호
 * @param search 검색어
 * @returns 센터 관리자 목록 조회 응답
 */
export const getAnnouncements = async ({
  center_sn,
}: {
  center_sn: number;
}) => {
  
  const { data: responseData } =
    await customAxios.get<NoticeListResponse>(
      `announcements/centers/${center_sn}`,
    );
  return responseData.data;
};
