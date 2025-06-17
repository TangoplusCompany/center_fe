import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

/**
 * 센터 관리자 권한 수정 API
 * @param sn 관리자 번호
 * @param role 권한
 * @returns 센터 관리자 권한 수정 응답
 */
export const patchCenterManagerRole = async ({
  sn,
  role,
}: {
  sn: number;
  role: number;
}) => {
  const response = await customAxios.patch<IResponseDefault>(`/centers/managers/${sn}/roles`, {
    role,
  });
  return response.data;
};
