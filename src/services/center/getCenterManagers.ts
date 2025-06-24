import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";
import { ICenterManagerListData } from "@/types/manager";

type CenterManagerListResponse = {
  data: ICenterManagerListData;
} & IResponseDefault;

/**
 * 센터 관리자 목록 조회 API
 * @returns 센터 관리자 목록 조회 응답
 */
export const getCenterManagers = async (search: string) => {
  const params: Record<string, string | number> = {};
  if (search?.trim() && search !== "") {
    params.search = search;
  }
  const { data: responseData } =
    await customAxios.get<CenterManagerListResponse>(`/centers/managers`, {
      params,
    });
  return responseData.data;
};
