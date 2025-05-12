import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

// type CenterManagerDetailResponse = {
//   data: ICenterManagerData;
// } & IResponseDefault;

export const getUserDetail = async ({ sn }: { sn: string }) => {
  const response = await customAxios.get(`/members/${sn}`);
  return response.data;
};
