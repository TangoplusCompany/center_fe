import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

/**
 * 센터 관리자 정보 수정 API
 * @param sn 관리자 번호
 * @param admin_name 관리자 이름
 * @param mobile 관리자 전화번호
 * @returns 센터 관리자 정보 수정 응답
 */
export const patchCenterManagerInformation = async ({
  sn,
  admin_name,
  mobile,
}: {
  sn: number;
  admin_name: string;
  mobile: string;
}) => {
  const response = await customAxios.patch<IResponseDefault>(
    `/auth/update/${sn}`,
    {
      admin_name,
      mobile,
    },
  );
  return response.data;
};
