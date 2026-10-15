import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePost2FAWithDrawAccount } from "@/hooks/api/auth/usePost2FAWithDrawAccount";
import EditManagerProfileContainer from "./EditUserProfileContainer";
import { useTranslations } from "next-intl";

export const EditUserContainer = () => {
  const t = useTranslations("Index");
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [isDelegateOpen, setIsDelegateOpen] = useState(false); // 주관리자 위임 모달 상태
  const [otpCode, setOtpCode] = useState("");

  const { mutate: requestWithdraw2FA, isPending: isRequesting2FA } =
    usePost2FAWithDrawAccount({
      onSuccess: () => {
        setIsWarningOpen(false);
        setIsOtpOpen(true);
      },
      onError: (error) => {
        // 409 응답: 주관리자 권한 위임 필요
        if (error.response?.status === 409) {
          setIsWarningOpen(false);
          setIsDelegateOpen(true);
          return;
        }
        console.error("2FA 요청 실패:", error);
      },
    });

  const handleConfirmWarning = () => {
    requestWithdraw2FA();
  };

  const handleSubmitOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim()) return;
    console.log("제출된 OTP:", otpCode);
  };

  return (
    <>
      <EditManagerProfileContainer />
      <Separator />

      <div
        className="flex w-full justify-end text-sub400 hover:text-sub400/90 cursor-pointer"
        onClick={() => setIsWarningOpen(true)}
      >
        {t("withdraw_membership")}
      </div>

      {/* 1. 탈퇴 경고 모달 */}
      <Dialog open={isWarningOpen} onOpenChange={setIsWarningOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("withdraw_title")}</DialogTitle>
            <DialogDescription className="space-y-2 pt-2 text-sm text-muted-foreground">
              {t("withdraw_desc")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsWarningOpen(false)}
              disabled={isRequesting2FA}
            >
              {t("btn_cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmWarning}
              disabled={isRequesting2FA}
            >
              {isRequesting2FA ? t("withdraw_btn_requesting") : t("withdraw_btn_request_code")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 2. 주관리자 권한 위임 안내 모달 (409 에러 시) */}
      <Dialog open={isDelegateOpen} onOpenChange={setIsDelegateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("delegate_required_title")}</DialogTitle>
            <DialogDescription className="space-y-2 pt-2 text-sm text-muted-foreground">
              {t("delegate_required_desc_1")}
              <br />
              {t("delegate_required_desc_2")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => {
                setIsDelegateOpen(false);
                // TODO: 권한 위임 페이지 이동 또는 위임 모달 열기 로직 연동
              }}
            >
              {t("btn_confirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 3. OTP 입력 모달 */}
      <Dialog open={isOtpOpen} onOpenChange={setIsOtpOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("email_auth_title")}</DialogTitle>
            <DialogDescription>
              {t("email_auth_desc")}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitOtp} className="space-y-4 pt-2">
            <Input
              type="text"
              placeholder={t("email_auth_code_placeholder")}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              maxLength={6}
              className="text-center text-lg tracking-widest"
              autoFocus
            />

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsOtpOpen(false);
                  setOtpCode("");
                }}
              >
                {t("btn_cancel")}
              </Button>
              <Button type="submit" variant="destructive" disabled={!otpCode}>
                {t("withdraw_complete_btn")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditUserContainer;