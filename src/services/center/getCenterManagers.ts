import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";
import { ICenterManagerData } from "@/types/manager";

type CenterManagerListResponse = {
  data: ICenterManagerData[];
} & IResponseDefault;

export const getCenterManagers = async () => {
  const { data: responseData } =
    await customAxios.get<CenterManagerListResponse>(`/centers/managers`);
  return responseData.data;
};
