import { useState } from "react";

/**
 * OTP 다이얼로그 상태 관리 Hook
 * @returns OTP 다이얼로그 열림 상태와 토글 함수
 */
export const useOtpDialog = () => {
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);

  const toggleDialog = () => {
    setIsOtpDialogOpen((prev) => !prev);
  };

  return {
    isOtpDialogOpen,
    toggleDialog,
  };
};
