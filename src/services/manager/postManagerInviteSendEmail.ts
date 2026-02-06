/**
 * 매니저 초대 - 이메일 인증 전송 (임시 Mock)
 * TODO: 실제 API 연동 시 교체
 */
const MOCK_DELAY_MS = 800;

export const postManagerInviteSendEmail = async (email: string) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
  return { success: true, message: "인증 메일을 발송했습니다." };
};
