import { customUnAuthAxios } from "@/lib/axios";
import type { IResponseDefault } from "@/types/default";

/** auth/register-sub-admin 요청 body */
export interface IRegisterSubAdminRequest {
  sub_admin_invitation_token: string;
  invitee_email: string;
  mobile: string;
  admin_name: string;
  password: string;
}

/**
 * 부관리자 회원가입
 * POST auth/register-sub-admin
 * (초대 링크의 token, email 쿼리와 폼 입력 사용)
 */
export const postRegisterSubAdmin = async (
  body: IRegisterSubAdminRequest,
) => {
  const { data } = await customUnAuthAxios.post<IResponseDefault>(
    "/auth/register-sub-admin",
    body,
  );
  return data;
};
