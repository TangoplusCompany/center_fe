import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";
import { ICenterManagerData } from "@/types/manager";

type CenterManagerDetailResponse = {
  data: ICenterManagerData;
} & IResponseDefault;
export const getCenterManagerDetail = async ({ sn }: { sn: string }) => {
  const { data: managerInformation } =
    await customAxios.get<CenterManagerDetailResponse>(
      `/centers/managers/${sn}`,
    );
  return managerInformation.data;
};
