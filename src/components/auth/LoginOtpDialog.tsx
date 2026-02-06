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
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/providers/AuthProvider";
import { postVerifyLoginOtp, Verify2FAError } from "@/services/auth/postVerifyLoginOtp";
import { postRequestLogin2FAOtp } from "@/services/auth/postRequestLogin2FAOtp";

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
  /** 2차 인증 플로우: request-2fa 이후 받은 temp_token */
  tempJwt: string;
  /** request-2fa 재전송 등으로 토큰이 갱신될 수 있어 외부에 반영 */
  onTempJwtChange?: (jwt: string) => void;
};

export const LoginOtpDialog = ({
  open,
  onOpenChange,
  phone,
  tempJwt,
  onTempJwtChange,
}: LoginOtpDialogProps) => {
  const router = useRouter();
  const setLogin = useAuthStore((state) => state.setLogin);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [verifyPending, setVerifyPending] = useState(false);
  const [resendPending, setResendPending] = useState(false);

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
  const handleResend = async () => {
    setTimeLeft(INITIAL_TIME);
    // 현재는 휴대폰 라디오가 비활성화라 사실상 email만 사용됨
    const type = phone === "휴대폰" ? "mobile" : "email";

    setResendPending(true);
    try {
      const res = await postRequestLogin2FAOtp({ type, tempJwt });
      // 재전송 성공 시 서버가 새 temp_token을 주므로 갱신
      onTempJwtChange?.(res.temp_token);
    } catch {
      alert("재전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setResendPending(false);
    }
  };

  const handleOtpSuccess = async (data: z.infer<typeof FormSchema>) => {
    // 2차 인증 플로우: temp_token으로 OTP 검증 API 호출 (성공해야만 로그인 완료)
    setVerifyPending(true);
    try {
      const type = phone === "휴대폰" ? "mobile" : "email";
      const loginDataRes = await postVerifyLoginOtp({
        otp: data.otp,
        type,
        tempJwt,
      });
      setLogin({
        isLogin: true,
        adminName: loginDataRes.admin_info.admin_name,
        adminEmail: loginDataRes.admin_info.admin_email,
        adminMobile: loginDataRes.admin_info.mobile,
        adminRole: loginDataRes.admin_info.admin_role,
        adminSn: loginDataRes.admin_info.sn,
        centerSn: 0,
        centerName: "",
        accessJwt: loginDataRes.access_jwt,
      });
      document.cookie = `isLogin=true; path=/; max-age=${60 * 60 * 3}`;
      onOpenChange(false);
      form.reset();
      router.push("/center");
    } catch (error) {
      const message =
        error instanceof Verify2FAError
          ? error.userMessage
          : "OTP가 올바르지 않습니다.";
      form.setError("otp", {
        type: "manual",
        message,
      });
    } finally {
      setVerifyPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>이중 인증</DialogTitle>
          <DialogDescription>
            {phone === "이메일" || phone === "휴대폰"
              ? `등록된 ${phone}(으)로 OTP를 전송했습니다.`
              : `등록된 핸드폰 번호(${phone})로 OTP를 전송했습니다.`}
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
              <Button
                type="submit"
                disabled={verifyPending}
              >
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
              className="text-sm"
              disabled={resendPending}
            >
              {resendPending ? "재전송 중..." : "재전송"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

