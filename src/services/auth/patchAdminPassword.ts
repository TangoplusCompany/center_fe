import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

/**
 * 관리자 비밀번호 변경 API
 * @param sn 관리자 번호
 * @param current_password 현재 비밀번호
 * @param new_password 새 비밀번호
 * @returns 관리자 비밀번호 변경 응답
 */
export const patchAdminPassword = async ({
  sn,
  current_password,
  new_password,
}: {
  sn: number;
  current_password: string;
  new_password: string;
}) => {
  const response = await customAxios.patch<IResponseDefault>(`/auth/update/${sn}/passwords`, {
    current_password,
    new_password,
  });
  return response.data;
};
