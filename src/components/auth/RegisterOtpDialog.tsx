"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import {
  postVerifyEmailOtp,
  getVerifyEmailOtpErrorMessage,
} from "@/services/auth/postVerifyEmailOtp";

const OTP_FORM_SCHEMA = z.object({
  otp: z.string().length(6, { message: "OTP는 6자리 숫자여야 합니다." }),
});

const INITIAL_TIME = 300; // 5분 = 300초

const DEFAULT_PASS_CODE = "123456";

export type RegisterOtpDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** verified, 성공 시 email_verification_temp_token 전달 (주관리자 회원가입 API용) */
  onVerified: (verified: boolean, emailVerificationTempToken?: string) => void;
  /** 재전송 클릭 시 호출 (주관리자 회원가입 시 temp_token으로 OTP 재요청) */
  onRequestOtp?: () => Promise<void>;
  /** 주관리자 플로우: 이메일 + temp_token 있으면 auth/verify-email-otp 호출 */
  email?: string;
  tempToken?: string | null;
};

export const RegisterOtpDialog = ({
  open,
  onOpenChange,
  onVerified,
  onRequestOtp,
  email,
  tempToken,
}: RegisterOtpDialogProps) => {
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [resendPending, setResendPending] = useState(false);
  const [verifyPending, setVerifyPending] = useState(false);
  const useVerifyApi = Boolean(email?.trim() && tempToken?.trim());

  const form = useForm<z.infer<typeof OTP_FORM_SCHEMA>>({
    resolver: zodResolver(OTP_FORM_SCHEMA),
    defaultValues: { otp: "" },
  });

  useEffect(() => {
    if (timeLeft <= 0 || !open) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, open]);

  useEffect(() => {
    if (open) {
      setTimeLeft(INITIAL_TIME);
      form.reset();
    }
  }, [open, form]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleResend = async () => {
    if (onRequestOtp) {
      setResendPending(true);
      try {
        await onRequestOtp();
        setTimeLeft(INITIAL_TIME);
        form.setValue("otp", "");
        form.clearErrors("otp");
      } finally {
        setResendPending(false);
      }
    } else {
      setTimeLeft(INITIAL_TIME);
      form.setValue("otp", "");
      form.clearErrors("otp");
    }
  };

  const onSubmit = async (data: z.infer<typeof OTP_FORM_SCHEMA>) => {
    if (timeLeft <= 0) {
      form.setError("otp", { message: "시간이 만료되었습니다. 재전송해주세요." });
      return;
    }

    if (useVerifyApi && email && tempToken) {
      setVerifyPending(true);
      try {
        const res = await postVerifyEmailOtp(
          {
            email_or_mobile: email.trim(),
            otp: data.otp,
            type: "email",
            purpose: "verify_email",
          },
          tempToken,
        );
        const token = res?.data?.email_verification_temp_token;
        onVerified(true, token);
        onOpenChange(false);
        form.reset();
      } catch (err) {
        if (err instanceof AxiosError) {
          const message = getVerifyEmailOtpErrorMessage(
            err.response?.status,
            err.response?.data,
          );
          alert(message);
        } else {
          alert("OTP 인증에 실패했습니다.");
        }
        onVerified(false);
        form.setError("otp", {
          type: "manual",
          message: "인증번호가 맞지 않습니다.",
        });
      } finally {
        setVerifyPending(false);
      }
      return;
    }

    if (data.otp === DEFAULT_PASS_CODE) {
      onVerified(true);
      onOpenChange(false);
      form.reset();
    } else {
      onVerified(false);
      form.setError("otp", {
        type: "manual",
        message: "인증번호가 맞지 않습니다.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>OTP 인증</DialogTitle>
          <DialogDescription>
            등록된 번호로 전송된 OTP 6자리를 입력해주세요.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center flex-wrap">
              <InputOTP
                maxLength={6}
                value={form.watch("otp")}
                onChange={(value) => form.setValue("otp", value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot className="bg-white" index={0} />
                  <InputOTPSlot className="bg-white" index={1} />
                  <InputOTPSlot className="bg-white" index={2} />
                  <InputOTPSlot className="bg-white" index={3} />
                  <InputOTPSlot className="bg-white" index={4} />
                  <InputOTPSlot className="bg-white" index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button type="submit" disabled={verifyPending}>
                {verifyPending ? "확인 중..." : "확인"}
              </Button>
            </div>

            {form.formState.errors.otp && (
              <p className="text-sm text-red-500">
                {form.formState.errors.otp.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {timeLeft > 0
                ? `남은 시간: ${formatTime(timeLeft)}`
                : "시간이 만료되었습니다."}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleResend}
              disabled={resendPending}
              className="text-sm"
            >
              {resendPending ? "전송 중..." : "재전송"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
