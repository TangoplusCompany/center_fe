import { customAxios } from "@/lib/axios";
import { ICenterInformation } from "@/types/center";
import { IResponseDefault } from "@/types/default";

type CenterInformationResponse = {
  data: ICenterInformation;
} & IResponseDefault;

/**
 * 센터 정보 조회 API
 * @param center_sn 센터 번호
 * @returns 센터 정보 조회 응답
 */
export const getCenterInformation = async (center_sn: number) => {
  const { data: centerInformation } =
    await customAxios.get<CenterInformationResponse>(`/centers/${center_sn}`);
  return centerInformation.data;
};
