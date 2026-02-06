import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

/**
 * 센터 정보 수정 API
 * @param center_sn 센터 번호
 * @param center_name 센터 이름
 * @param center_address 센터 주소
 * @param center_address_detail 센터 상세 주소
 * @param center_phone 센터 번호
 * @returns 센터 정보 수정 응답
 */
export const patchCenterInformation = async ({
  center_sn,
  center_name,
  center_address,
  center_address_detail,
  center_phone,
}: {
  center_sn: number;
  center_name: string;
  center_address: string;
  center_address_detail: string;
  center_phone?: string;
}) => {
  const response = await customAxios.patch<IResponseDefault>(
    `/centers/${center_sn}`,
    {
      center_name,
      center_address,
      center_address_detail,
      center_phone,
    },
  );
  return response.data;
};
