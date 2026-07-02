import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";
import { INoticeList } from "@/types/notice";

type NoticeListResponse = {
  data: INoticeList;
} & IResponseDefault;

/**
 * 센터 관리자 목록 조회 API
 * @param center_sn 센터 번호
 * @param search 검색어
 * @returns 센터 관리자 목록 조회 응답
 */
export const getNoticeLists = async ({
  center_sn,
  search,
}: {
  center_sn: number;
  search: string;
}) => {
  const params: Record<string, string | number> = {};
  if (search?.trim() && search !== "") {
    params.search = search;
  }
  const { data: responseData } =
    await customAxios.get<NoticeListResponse>(
      `/centers/${center_sn}/managers`,
      { params },
    );
  return responseData.data;
};
