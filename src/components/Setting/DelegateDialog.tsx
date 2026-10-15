import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Index");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError(null);
  };

  const handleSubmit = async () => {
    if (!email) {
      setEmailError(t("email_invalid"));
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setEmailError(t("email_invalid"));
      return;
    }

    const confirmed = window.confirm(t("delegate_confirm_msg", { email }));
    if (!confirmed) return;

    setIsPending(true);
    try {
      // TODO: 초대 API 연결
      // await postDelegateInvite({ email });
      onOpenChange(false);
      setEmail("");
      onSuccess?.();
    } catch (e) {
      setEmailError(e instanceof Error ? e.message : t("alert_otp_error_etc"));
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
          <DialogTitle>{t("delegate_center_title")}</DialogTitle>
          <DialogDescription>
            {t("delegate_center_desc")}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 pt-2">
          <div className="flex flex-col gap-1.5">
            <Input
              type="email"
              placeholder={t("delegate_email_input")}
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
              {t("btn_cancel")}
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? t("delegate_btn_inviting") : t("delegate_btn_invite")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DelegateDialog;