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

const OTP_FORM_SCHEMA = z.object({
  otp: z.string().length(6, { message: "OTP는 6자리 숫자여야 합니다." }),
});

const INITIAL_TIME = 300; // 5분 = 300초

const DEFAULT_PASS_CODE = "123456";

export type RegisterOtpDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerified: (verified: boolean) => void;
};

export const RegisterOtpDialog = ({
  open,
  onOpenChange,
  onVerified,
}: RegisterOtpDialogProps) => {
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

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

  const handleResend = () => {
    setTimeLeft(INITIAL_TIME);
    form.setValue("otp", "");
    form.clearErrors("otp");
  };

  const onSubmit = (data: z.infer<typeof OTP_FORM_SCHEMA>) => {
    if (timeLeft <= 0) {
      form.setError("otp", { message: "시간이 만료되었습니다. 재전송해주세요." });
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
              <Button type="submit">확인</Button>
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
              className="text-sm"
            >
              재전송
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
