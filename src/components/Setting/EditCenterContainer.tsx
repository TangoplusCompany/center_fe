"use client";

import CenterEditForm from "@/components/Center/CenterEditForm";
import { useGetCenterInformation } from "@/hooks/api/center/useGetCenterInformation";
import React, { useEffect, useState } from "react";
import { Login2FAMethod, Login2FAMethodDialog } from "../auth/Login2FAMethodDialog";
import { LoginData, useOtpDialog } from "@/hooks/api/auth/useOtpDialog";
// import { Button } from "../ui/button";
import { LoginOtpDialog } from "../auth/LoginOtpDialog";
import DelegateDialog from "./DelegateDialog";
import WarningDialog from "./WarningDialog";

const EMPTY_LOGIN_DATA = {} as LoginData;

const EditCenterContainer = () => {
  const { data: centerInformation, isLoading, isError } = useGetCenterInformation();

  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [is2FAMethodOpen, setIs2FAMethodOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [tempJwt, setTempJwt] = useState<string | null>(null);
  const { isOtpDialogOpen, phone, openDialog,  setIsOtpDialogOpen, updateTempJwt } = useOtpDialog();
  
  const prevOtpOpen = React.useRef(false);
  useEffect(() => {
    if (prevOtpOpen.current === true && isOtpDialogOpen === false) {
      setIsInviteOpen(true);
    }
    prevOtpOpen.current = isOtpDialogOpen;
  }, [isOtpDialogOpen]);

  const handle2FANext = (method: Login2FAMethod, requestedTempToken: string) => {
    const contact = method === "email" ? "이메일" : "휴대폰";
    setTempJwt(requestedTempToken);
    updateTempJwt(requestedTempToken);
    openDialog(contact, EMPTY_LOGIN_DATA, requestedTempToken);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  if (!centerInformation) return <div>No data available</div>;

  return (
    <div className="flex flex-col gap-4">
      <CenterEditForm centerData={centerInformation} />

      {/* <div className="flex w-full justify-end">
        <Button className="w-fit bg-sub700 hover:bg-sub700/90 text-white hover:text-white" type="button" variant="outline" onClick={() => setIsWarningOpen(true)}>
          주관리자 권한 위임
        </Button>
      </div> */}
      {/* TODO 버튼 클릭하면 삭제 프로세스대로 otp 2fa 넣기. 아마 hooks만 수정하면 됨 */}
      <WarningDialog
        open={isWarningOpen}
        onOpenChange={setIsWarningOpen}
        onConfirm={() => {
          setIsWarningOpen(false);
          setIs2FAMethodOpen(true);
        }}
        warningType="delegate"
      />

      <Login2FAMethodDialog
        open={is2FAMethodOpen}
        onOpenChange={setIs2FAMethodOpen}
        tempJwt={tempJwt ?? ""}
        onNext={(method, token) => {
          setIs2FAMethodOpen(false);
          handle2FANext(method, token);
        }}
      />

      <LoginOtpDialog
        open={isOtpDialogOpen}
        onOpenChange={setIsOtpDialogOpen}
        phone={phone}
        tempJwt={tempJwt ?? ""}
        onTempJwtChange={updateTempJwt}
      />

      <DelegateDialog
        open={isInviteOpen}
        onOpenChange={setIsInviteOpen}
      />
    </div>
  );
};

export default EditCenterContainer;