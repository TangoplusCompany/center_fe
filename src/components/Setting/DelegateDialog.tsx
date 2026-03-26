import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface DelegateDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSuccess?: () => void;
}

export const DelegateDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: DelegateDialogProps) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError(null);
  };

  const handleSubmit = async () => {
    if (!email) {
      setEmailError("이메일을 입력해주세요.");
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
      return;
    }

    const confirmed = window.confirm(`${email}로 센터 위임 초대를 보내시겠습니까?`);
    if (!confirmed) return;

    setIsPending(true);
    try {
      // TODO: 초대 API 연결
      // await postDelegateInvite({ email });
      onOpenChange(false);
      setEmail("");
      onSuccess?.();
    } catch (e) {
      setEmailError(e instanceof Error ? e.message : "초대 전송에 실패했습니다.");
    } finally {
      setIsPending(false);
    }
  };

  const handleOpenChange = (v: boolean) => {
    if (!v) {
      setEmail("");
      setEmailError(null);
    }
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>센터 위임</DialogTitle>
          <DialogDescription>
            위임할 관리자의 이메일을 입력해주세요. 초대 메일이 발송됩니다.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 pt-2">
          <div className="flex flex-col gap-1.5">
            <Input
              type="email"
              placeholder="이메일 입력"
              value={email}
              onChange={handleEmailChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              className={emailError ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {emailError && (
              <p className="text-sm text-destructive">{emailError}</p>
            )}
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
            >
              취소
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? "전송 중..." : "초대"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DelegateDialog;