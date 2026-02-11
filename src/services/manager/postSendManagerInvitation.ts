import { customAxios } from "@/lib/axios";
import type { IResponseDefault } from "@/types/default";

/** 부관리자 초대 링크 요청 body */
export interface ISendManagerInvitationBody {
  invitee_email: string;
  admin_role: number; // 2: 부관리자, 3: 일반
}

/**
 * 부관리자 초대 링크 요청
 * POST centers/{center_sn}/managers/send-invitation
 */
export const postSendManagerInvitation = async (
  centerSn: number,
  body: ISendManagerInvitationBody,
) => {
  const { data } = await customAxios.post<IResponseDefault>(
    `/centers/${centerSn}/managers/send-invitation`,
    body,
  );
  return data;
};
