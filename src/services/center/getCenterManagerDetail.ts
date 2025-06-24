import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";
import { ICenterManagerData } from "@/types/manager";

type CenterManagerDetailResponse = {
  data: ICenterManagerData;
} & IResponseDefault;

/**
 * 센터 관리자 상세 조회 API
 * @param sn 관리자 번호
 * @returns 센터 관리자 상세 조회 응답
 */
export const getCenterManagerDetail = async ({ sn }: { sn: string }) => {
  const { data: managerInformation } =
    await customAxios.get<CenterManagerDetailResponse>(
      `/centers/managers/${sn}`,
    );
  return managerInformation.data;
};
