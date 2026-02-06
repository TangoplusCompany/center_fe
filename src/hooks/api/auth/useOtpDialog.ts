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
  const [tempJwt, setTempJwt] = useState<string | null>(null);

  const openDialog = (
    phoneNumber: string,
    loginInfo: LoginData,
    jwt?: string | null,
  ) => {
    setPhone(phoneNumber);
    setLoginData(loginInfo);
    setTempJwt(jwt ?? null);
    setIsOtpDialogOpen(true);
  };

  const closeDialog = () => {
    setIsOtpDialogOpen(false);
  };

  const resetDialog = () => {
    setIsOtpDialogOpen(false);
    setPhone("");
    setLoginData(null);
    setTempJwt(null);
  };

  return {
    isOtpDialogOpen,
    phone,
    loginData,
    tempJwt,
    updateTempJwt: (jwt: string | null) => setTempJwt(jwt),
    openDialog,
    closeDialog,
    resetDialog,
    setIsOtpDialogOpen,
  };
};
