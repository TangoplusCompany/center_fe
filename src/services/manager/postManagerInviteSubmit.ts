/**
 * 매니저 초대 전송 (임시 Mock)
 * TODO: 실제 API 연동 시 교체
 */
const MOCK_DELAY_MS = 800;

export const postManagerInviteSubmit = async (payload: {
  email: string;
  role: number; // 2: 부관리자, 3: 일반
}) => {
  void payload; // Mock: 실제 API 연동 시 사용
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
  return { success: true, message: "매니저 초대가 전송되었습니다." };
};
