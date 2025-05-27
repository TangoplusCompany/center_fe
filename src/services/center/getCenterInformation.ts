import { customAxios } from "@/lib/axios";
import { ICenterInformation } from "@/types/center";
import { IResponseDefault } from "@/types/default";

type CenterInformationResponse = {
  data: ICenterInformation;
} & IResponseDefault;

export const getCenterInformation = async () => {
  const { data: centerInformation } =
    await customAxios.get<CenterInformationResponse>(`/centers`);
  return centerInformation.data;
};
