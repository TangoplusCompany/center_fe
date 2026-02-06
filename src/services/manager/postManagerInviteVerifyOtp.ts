/**
 * 매니저 초대 - OTP 검증 (임시 Mock)
 * 123456 일치 시 성공
 * TODO: 실제 API 연동 시 교체
 */
const MOCK_DELAY_MS = 500;
const VALID_OTP = "123456";

export const postManagerInviteVerifyOtp = async (otp: string) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
  const match = otp === VALID_OTP;
  return { success: match, message: match ? "otp가 일치합니다." : "otp가 일치하지 않습니다." };
};
