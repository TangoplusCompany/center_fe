// import { useEffect, useState } from "react";
import EditManagerPasswordForm from "../Manager/EditManagerPasswordForm";
import { Separator } from "../ui/separator";
import EditManagerProfileContainer from "./EditUserProfileContainer";
// import { useOtpDialog } from "@/hooks/api/auth/useOtpDialog";
import React from "react";
// import { Login2FAMethod } from "./2FAMethodDialog";

// const EMPTY_LOGIN_DATA = {} as LoginData;

export const EditUserContainer = () => {
  
  // const [isWarningOpen, setIsWarningOpen] = useState(false);
  // const [is2FAMethodOpen, setIs2FAMethodOpen] = useState(false);
  // const [isInviteOpen, setIsInviteOpen] = useState(false);
  // const [tempJwt, setTempJwt] = useState<string | null>(null);
  // const { isOtpDialogOpen, phone, openDialog,  setIsOtpDialogOpen, updateTempJwt } = useOtpDialog();

  // const prevOtpOpen = React.useRef(false);
  // useEffect(() => {
  //   if (prevOtpOpen.current === true && isOtpDialogOpen === false) {
  //     setIsInviteOpen(true);
  //   }
  //   prevOtpOpen.current = isOtpDialogOpen;
  // }, [isOtpDialogOpen]);

  // const handle2FANext = (method: Login2FAMethod, requestedTempToken: string) => {
  //   const contact = method === "email" ? "이메일" : "휴대폰";
  //   setTempJwt(requestedTempToken);
  //   updateTempJwt(requestedTempToken);
  //   openDialog(contact, EMPTY_LOGIN_DATA, requestedTempToken);
  // };
  
  return (
    <>
      <EditManagerProfileContainer />
      <Separator />
      <EditManagerPasswordForm />
      {/* <div className="flex w-full justify-end text-sub400 hover:text-sub400/90 cursor-pointer" onClick={() => setIsWarningOpen(true)}>
        회원 탈퇴
      </div> */}
    </>
  );
};

export default EditUserContainer;