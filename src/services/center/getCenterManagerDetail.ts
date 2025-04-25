import { customUnAuthAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";
import { ICenterManagerData } from "@/types/setting";

type CenterManagerListResponse = {
  data: ICenterManagerData;
} & IResponseDefault;
export const getCenterManagerDetail = async ({ sn }: { sn: string }) => {
  const { data: managerInformation } =
    await customUnAuthAxios.get<CenterManagerListResponse>(
      `/centers/managers/${sn}`,
    );
  return managerInformation.data;
};
