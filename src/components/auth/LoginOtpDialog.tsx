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
import { useLogin } from "@/hooks/api/auth/useLogin";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "OTP는 6자리 숫자여야 합니다.",
  }),
});

const INITIAL_TIME = 300; // 5분 = 300초

type LoginOtpDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phone: string;
  loginData: {
    email: string;
    password: string;
  };
};

export const LoginOtpDialog = ({
  open,
  onOpenChange,
  phone,
  loginData,
}: LoginOtpDialogProps) => {
  const loginMutation = useLogin();
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  // 타이머 로직
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

  // Dialog가 열릴 때 타이머 리셋
  useEffect(() => {
    if (open) {
      setTimeLeft(INITIAL_TIME);
      form.reset();
    }
  }, [open, form]);

  // 시간 포맷 (mm:ss)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // 재전송 핸들러
  const handleResend = () => {
    setTimeLeft(INITIAL_TIME);
    // TODO: 재전송 API 호출
  };

  const handleOtpSuccess = async (data: z.infer<typeof FormSchema>) => {
    // API 미구현 상태: 기본값 123456으로 통과
    if (data.otp === "123456") {
      // OTP 검증 성공 후 실제 로그인 API 호출
      // 로그인 성공 시 useLogin의 onSuccess에서 router.push로 페이지 이동하므로
      // 팝업은 자동으로 닫히게 됨
      loginMutation.mutate(
        {
          email: loginData.email,
          password: loginData.password,
        },
        {
          onSuccess: () => {
            // 로그인 성공 시 팝업 닫기 및 폼 리셋 (페이지 이동 전에 실행됨)
            onOpenChange(false);
            form.reset();
          },
          onError: () => {
            // 에러 발생 시 팝업은 열려있도록 유지
          },
        }
      );
    } else {
      form.setError("otp", {
        type: "manual",
        message: "OTP가 올바르지 않습니다.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>이중 인증</DialogTitle>
          <DialogDescription>
            등록된 핸드폰 번호({phone})로 OTP를 전송했습니다.
            <br />
            OTP를 입력해주세요.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(handleOtpSuccess)}
          className="w-full flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
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
              <Button type="submit" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? "확인 중..." : "확인"}
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

