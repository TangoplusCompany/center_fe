"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { postRequestLogin2FAOtp } from "@/services/auth/postRequestLogin2FAOtp";
import { useTranslations } from "next-intl";

export type Login2FAMethod = "email" | "mobile";

type Login2FAMethodDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tempJwt: string;
  /** request-2fa 성공 후 반환된 temp_token을 함께 넘김 */
  onNext: (method: Login2FAMethod, requestedTempToken: string) => void;
};

export const Login2FAMethodDialog = ({
  open,
  onOpenChange,
  tempJwt,
  onNext,
}: Login2FAMethodDialogProps) => {
  const t = useTranslations("Index");
  const [method, setMethod] = useState<Login2FAMethod>("email");
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleNext = async () => {
    setErrorMessage(null);
    setIsPending(true);
    try {
      const res = await postRequestLogin2FAOtp({ type: method, tempJwt });
      

      onOpenChange(false);
      onNext(method, res.temp_token);
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : t('2fa_request_fail'));
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] sm:w-full sm:max-w-md" onKeyDown={(e) => { if (e.key === "Enter") handleNext(); }}>
        <DialogHeader>
          <DialogTitle>{t('2fa_select')}</DialogTitle>
          <DialogDescription>
            {t('2fa_select_select_explain')}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => { e.preventDefault(); handleNext(); }}
          className="flex flex-col gap-4 pt-2"
        >
          <RadioGroup
            value={method}
            onValueChange={(v) => setMethod(v as Login2FAMethod)}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="2fa-email" />
              <Label htmlFor="2fa-email" className="cursor-pointer font-normal">
                {t('2fa_select_email')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mobile" id="2fa-mobile" />
              <Label htmlFor="2fa-mobile" className="cursor-pointer font-normal">
                {t('2fa_select_mobile')}
              </Label>
            </div>
          </RadioGroup>
          {errorMessage && (
            <p className="text-sm text-destructive">{errorMessage}</p>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? t('2fa_select_pending') : t('2fa_select_next')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
