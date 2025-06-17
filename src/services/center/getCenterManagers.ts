import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";
import { ICenterManagerData } from "@/types/manager";

type CenterManagerListResponse = {
  data: ICenterManagerData[];
} & IResponseDefault;

/**
 * 센터 관리자 목록 조회 API
 * @returns 센터 관리자 목록 조회 응답
 */
export const getCenterManagers = async () => {
  const { data: responseData } =
    await customAxios.get<CenterManagerListResponse>(`/centers/managers`);
  return responseData.data;
};
