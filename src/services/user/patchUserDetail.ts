import { customAxios } from "@/lib/axios";
import { ICenterUserDetail } from "@/types/center";
import { IResponseDefault } from "@/types/default";

export const patchUserDetail = async ({
  sn,
  userData,
}: {
  sn: string;
  userData: Pick<ICenterUserDetail, 'user_name' | 'address' | 'address_detail' | 'gender' | 'weight' | 'height'>;
}) => {
  const { data } = await customAxios.patch<IResponseDefault>(`/members/${sn}`, {
    user_name: userData.user_name,
    address: userData.address,
    address_detail: userData.address_detail,
    gender: userData.gender,
    weight: userData.weight,
    height: userData.height,
  });
  return data;
};
