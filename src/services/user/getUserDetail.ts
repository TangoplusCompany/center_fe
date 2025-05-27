import { customAxios } from "@/lib/axios";
import { ICenterUserDetail } from "@/types/center";
import { IResponseDefault } from "@/types/default";

type CenterUserDetailResponse = {
  data: ICenterUserDetail;
} & IResponseDefault;

export const getUserDetail = async ({ sn }: { sn: string }) => {
  const { data } = await customAxios.get<CenterUserDetailResponse>(
    `/members/${sn}`,
  );
  return data;
};
