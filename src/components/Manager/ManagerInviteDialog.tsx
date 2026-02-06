"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { postManagerInviteSendEmail } from "@/services/manager/postManagerInviteSendEmail";
import { postManagerInviteSubmit } from "@/services/manager/postManagerInviteSubmit";

const emailSchema = z.object({
  email: z.string().min(1, "이메일을 입력해주세요.").email("올바른 이메일 형식이 아닙니다."),
});

type EmailFormValues = z.infer<typeof emailSchema>;

const VALID_OTP = "123456";

type ManagerInviteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export const ManagerInviteDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: ManagerInviteDialogProps) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [otpValue, setOtpValue] = useState("");
  const [otpVerified, setOtpVerified] = useState<boolean | null>(null);
  const [sendPending, setSendPending] = useState(false);
  const [submitPending, setSubmitPending] = useState(false);

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const otpMatch = otpVerified === true;
  const handleOtpConfirm = () => {
    if (otpValue.length !== 6) return;
    setOtpVerified(otpValue === VALID_OTP);
  };

  const handleSendEmail = emailForm.handleSubmit(async (data) => {
    setSendPending(true);
    try {
      await postManagerInviteSendEmail(data.email);
      setStep(2);
    } catch {
      alert("인증 메일 전송에 실패했습니다.");
    } finally {
      setSendPending(false);
    }
  });

  const handleInviteSubmit = async () => {
    const email = emailForm.getValues("email");
    if (!email || !otpMatch) return;
    setSubmitPending(true);
    try {
      await postManagerInviteSubmit({ email, otp: otpValue });
      alert("매니저 초대가 전송되었습니다.");
      onOpenChange(false);
      onSuccess?.();
      setStep(1);
      setOtpValue("");
      emailForm.reset();
    } catch {
      alert("매니저 초대 전송에 실패했습니다.");
    } finally {
      setSubmitPending(false);
    }
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setStep(1);
      setOtpValue("");
      setOtpVerified(null);
      emailForm.reset();
    }
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>매니저 초대</DialogTitle>
          <DialogDescription>
            {step === 1
              ? "초대할 매니저의 이메일로 인증 메일을 보냅니다."
              : "이메일로 전송된 OTP 6자리를 입력해주세요. (테스트: 123456)"}
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <form onSubmit={handleSendEmail} className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="invite-email">초대 매니저 이메일</Label>
              <div className="flex gap-2">
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="example@email.com"
                  {...emailForm.register("email")}
                />
                <Button type="submit" disabled={sendPending}>
                  {sendPending ? "전송 중..." : "전송"}
                </Button>
              </div>
              {emailForm.formState.errors.email && (
                <p className="text-sm text-red-500">
                  {emailForm.formState.errors.email.message}
                </p>
              )}
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label>OTP 인증</Label>
              <div className="flex gap-2 items-center">
                <InputOTP
                  maxLength={6}
                  value={otpValue}
                  onChange={(value) => {
                    setOtpValue(value);
                    setOtpVerified(null);
                  }}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleOtpConfirm}
                  disabled={otpValue.length !== 6}
                >
                  확인
                </Button>
              </div>
              {otpVerified !== null && (
                <p
                  className={
                    otpMatch
                      ? "text-sm text-green-600 dark:text-green-400"
                      : "text-sm text-red-500"
                  }
                >
                  {otpMatch ? "otp가 일치합니다." : "otp가 일치하지 않습니다."}
                </p>
              )}
            </div>
            <Button
              onClick={handleInviteSubmit}
              disabled={!otpMatch || submitPending}
            >
              {submitPending ? "전송 중..." : "매니저 초대 전송"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
