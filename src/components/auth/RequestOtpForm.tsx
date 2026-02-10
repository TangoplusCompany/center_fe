"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { getRequestOtpErrorMessage } from "@/hooks/api/auth/useOtpRequest";
import { useOtpVerify } from "@/hooks/api/auth/useOtpVerify";
import { useUnlockAccountVerify } from "@/hooks/api/auth/useUnlockAccountVerify";
import { postOtpRequest } from "@/services/auth/postOtpRequest";
import { AxiosError } from "axios";
import type { Purpose, Type } from "@/types/admin";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "OTP는 6자리입니다.",
  }),
});

const OTP_VALID_SECONDS = 300; // 5분

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export const RequestOtpForm = ({
  email_or_mobile,
  handleRequestOtp,
  purpose = "password",
  type = "email",
}: {
  /** OTP 받을 이메일 또는 전화번호 (t_admin_info에 등록된 값) */
  email_or_mobile: string;
  handleRequestOtp: (jwt: string) => void;
  /** account: 계정해제, password: 비밀번호 찾기 */
  purpose?: Purpose;
  /** OTP 전달 매개체: email | mobile */
  type?: Type;
}) => {
  const [timeLeft, setTimeLeft] = useState(OTP_VALID_SECONDS);
  const [resendPending, setResendPending] = useState(false);

  const { mutate: otpVerify } = useOtpVerify({ handleRequestOtp });
  const { mutate: unlockAccountVerify } = useUnlockAccountVerify({
    onSuccess: handleRequestOtp,
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  // 5분 타이머
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = async () => {
    setResendPending(true);
    try {
      await postOtpRequest({
        email_or_mobile,
        type,
        purpose,
      });
      setTimeLeft(OTP_VALID_SECONDS);
      form.setValue("otp", "");
      form.clearErrors("otp");
      alert("OTP가 재전송되었습니다.");
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        alert(
          getRequestOtpErrorMessage(err.response.status)
        );
      } else {
        alert("재전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    } finally {
      setResendPending(false);
    }
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (timeLeft <= 0) {
      form.setError("otp", {
        type: "manual",
        message: "시간이 만료되었습니다. 재전송해주세요.",
      });
      return;
    }
    if (purpose === "account") {
      unlockAccountVerify({
        email_or_mobile,
        type,
        purpose: "account",
        otp: data.otp,
      });
      return;
    }
    otpVerify({
      email_or_mobile,
      type,
      purpose,
      otp: data.otp,
    });
  }

  const isAccountUnlock = purpose === "account";

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-2"
    >
      <legend className="text-lg">
        {isAccountUnlock ? "잠긴 계정 해제용 OTP 입력" : "OTP 입력"}
      </legend>
      <div className="flex gap-2 items-center">
        <InputOTP
          maxLength={6}
          value={form.watch("otp")}
          onChange={(value) => form.setValue("otp", value)}
        >
          <InputOTPGroup>
            <InputOTPSlot className="bg-white dark:bg-border" index={0} />
            <InputOTPSlot className="bg-white dark:bg-border" index={1} />
            <InputOTPSlot className="bg-white dark:bg-border" index={2} />
            <InputOTPSlot className="bg-white dark:bg-border" index={3} />
            <InputOTPSlot className="bg-white dark:bg-border" index={4} />
            <InputOTPSlot className="bg-white dark:bg-border" index={5} />
          </InputOTPGroup>
        </InputOTP>
        <Button type="submit">확인</Button>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm text-muted-foreground">
          유효시간 {formatTime(timeLeft)}
        </span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleResend}
          disabled={resendPending}
        >
          {resendPending ? "전송 중..." : "재전송"}
        </Button>
      </div>
      {form.formState.errors.otp && (
        <p className="text-sm text-red-500">
          {form.formState.errors.otp.message}
        </p>
      )}
    </form>
  );
};
