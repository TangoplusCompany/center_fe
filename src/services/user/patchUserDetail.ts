import { customAxios } from "@/lib/axios";
import { ICenterUserDetail } from "@/types/center";
import { IResponseDefault } from "@/types/default";

/**
 * 사용자 상세 수정 API
 * @param sn 사용자 번호
 * @param center_sn 센터 번호
 * @param userData 사용자 상세 데이터
 * @returns 사용자 상세 수정 응답
 */
export const patchUserDetail = async ({
  sn,
  center_sn,
  userData,
}: {
  sn: string;
  center_sn: number;
  userData: Pick<ICenterUserDetail, 'user_name' | 'address' | 'address_detail' | 'gender' | 'weight' | 'height'>;
}) => {
  const { data } = await customAxios.patch<IResponseDefault>(
    `/members/${sn}/centers/${center_sn}`,
    {
    user_name: userData.user_name,
    address: userData.address,
    address_detail: userData.address_detail,
    gender: userData.gender,
    weight: userData.weight,
    height: userData.height,
  },
  );
  return data;
};
