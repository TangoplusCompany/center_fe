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

export const EditUserContainer = () => {
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
        회원 탈퇴
      </div>

      {/* 1. 탈퇴 경고 모달 */}
      <Dialog open={isWarningOpen} onOpenChange={setIsWarningOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>회원 탈퇴 안내</DialogTitle>
            <DialogDescription className="space-y-2 pt-2 text-sm text-muted-foreground">
              탈퇴 시 계정 정보 및 모든 데이터가 영구 삭제되며 복구할 수 없습니다.
              계속 진행하시겠습니까?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsWarningOpen(false)}
              disabled={isRequesting2FA}
            >
              취소
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmWarning}
              disabled={isRequesting2FA}
            >
              {isRequesting2FA ? "요청 중..." : "확인 및 인증번호 받기"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 2. 주관리자 권한 위임 안내 모달 (409 에러 시) */}
      <Dialog open={isDelegateOpen} onOpenChange={setIsDelegateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>주관리자 권한 위임 필요</DialogTitle>
            <DialogDescription className="space-y-2 pt-2 text-sm text-muted-foreground">
              현재 계정은 주관리자 권한을 보유하고 있어 바로 탈퇴할 수 없습니다.
              <br />
              다른 관리자에게 권한을 위임한 후 탈퇴를 진행해 주세요.
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
              확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 3. OTP 입력 모달 */}
      <Dialog open={isOtpOpen} onOpenChange={setIsOtpOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>이메일 인증</DialogTitle>
            <DialogDescription>
              가입된 이메일로 전송된 인증번호 6자리를 입력해주세요.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitOtp} className="space-y-4 pt-2">
            <Input
              type="text"
              placeholder="인증번호 입력"
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
                취소
              </Button>
              <Button type="submit" variant="destructive" disabled={!otpCode}>
                탈퇴 완료
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditUserContainer;