import { useState } from "react";

type LoginData = {
  email: string;
  password: string;
};

/**
 * OTP 다이얼로그 상태 관리 Hook
 * @returns OTP 다이얼로그 관련 상태와 함수들
 */
export const useOtpDialog = () => {
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [loginData, setLoginData] = useState<LoginData | null>(null);

  const openDialog = (phoneNumber: string, loginInfo: LoginData) => {
    setPhone(phoneNumber);
    setLoginData(loginInfo);
    setIsOtpDialogOpen(true);
  };

  const closeDialog = () => {
    setIsOtpDialogOpen(false);
    // 다이얼로그가 닫힐 때 상태 초기화 (선택사항)
    // setPhone("");
    // setLoginData(null);
  };

  const resetDialog = () => {
    setIsOtpDialogOpen(false);
    setPhone("");
    setLoginData(null);
  };

  return {
    isOtpDialogOpen,
    phone,
    loginData,
    openDialog,
    closeDialog,
    resetDialog,
    setIsOtpDialogOpen,
  };
};
