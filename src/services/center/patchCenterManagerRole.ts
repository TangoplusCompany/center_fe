import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

/**
 * 센터 관리자 권한 수정 API
 * @param center_sn 센터 번호
 * @param sn 관리자 번호
 * @param role 권한
 * @returns 센터 관리자 권한 수정 응답
 */
export const patchCenterManagerRole = async ({
  center_sn,
  sn,
  role,
}: {
  center_sn: number;
  sn: number;
  role: number;
}) => {
  const response = await customAxios.patch<IResponseDefault>(
    `/centers/${center_sn}/managers/${sn}/roles`,
    { role },
  );
  return response.data;
};
