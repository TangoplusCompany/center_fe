import { customAxios } from "@/lib/axios";
import { ICenterInformation } from "@/types/center";
import { IResponseDefault } from "@/types/default";

type CenterInformationResponse = {
  data: ICenterInformation;
} & IResponseDefault;

/**
 * 센터 정보 조회 API
 * @returns 센터 정보 조회 응답
 */
export const getCenterInformation = async () => {
  const { data: centerInformation } =
    await customAxios.get<CenterInformationResponse>(`/centers`);
  return centerInformation.data;
};
