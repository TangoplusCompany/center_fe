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
import { ApiStatusError, postRequestLogin2FAOtp } from "@/services/auth/postRequestLogin2FAOtp";
import { useTranslations } from "next-intl";
import axios from "axios";




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
const MAX_VERIFY_ATTEMPTS = 5;
const MAX_RESEND_ATTEMPTS = 10;

export const LoginOtpDialog = ({
  open,
  onOpenChange,
  phone,
  tempJwt,
  onTempJwtChange,
}: LoginOtpDialogProps) => {
  const t = useTranslations("Index");
  const router = useRouter();
  const setLogin = useAuthStore((state) => state.setLogin);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [verifyPending, setVerifyPending] = useState(false);
  const [resendPending, setResendPending] = useState(false);
  const isPhoneType = phone === "휴대폰" || phone === "phone" || phone === t("setting_account_mobile");
  const isEmailType = phone === "이메일" || phone === "email";
  const type = isPhoneType ? "mobile" : "email";
  const [resendCount, setResendCount] = useState(0);
  const [verifyFailCount, setVerifyFailCount] = useState(0);

  const FormSchema = z.object({
    otp: z.string().min(6, {
      message: t('otp_input_6'),
    }),
  });


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
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
    if (resendCount >= MAX_RESEND_ATTEMPTS) {
      alert(t('alert_otp_send_max_fail'));
      return;
    }

    setTimeLeft(INITIAL_TIME);
    const type = phone === "휴대폰" ? "mobile" : "email";

    setResendPending(true);
    try {
      const res = await postRequestLogin2FAOtp({ type, tempJwt });
      setResendCount((prev) => prev + 1);
      onTempJwtChange?.(res.temp_token);
      alert(t('alert_otp_request_again'));
    } catch (e) {
      // 429(발급 초과) 또는 423(잠김) 시 즉시 MAX로 설정
      if (e instanceof ApiStatusError && (e.status === 429 || e.status === 423)) {
        setResendCount(MAX_RESEND_ATTEMPTS);
      }
      alert(e instanceof Error ? e.message : t('alert_otp_send_fail'));
    } finally {
      setResendPending(false);
    }
  };

  const handleOtpSuccess = async (data: z.infer<typeof FormSchema>) => {
    if (verifyFailCount >= MAX_VERIFY_ATTEMPTS) {
      alert(t('alert_otp_verify_max_fail'));
      return;
    }

    setVerifyPending(true);
    try {
      const loginDataRes = await postVerifyLoginOtp({
        t,
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
    } catch (error: unknown) {
      // 상태 코드 확인을 위한 타입 가드
      let status: number | undefined;
      if (axios.isAxiosError(error)) {
        status = error.response?.status;
      } else if (error instanceof ApiStatusError) {
        status = error.status;
      }

      // 서버 잠김/초과 응답(422, 423, 429) 시 카운트 동기화
      if (status === 422 || status === 423 || status === 429) {
        setVerifyFailCount(MAX_VERIFY_ATTEMPTS);
        if (status === 429 || status === 423) {
          setResendCount(MAX_RESEND_ATTEMPTS);
        }
        alert(t('alert_otp_verify_max_fail'));
        return;
      }

      // 일반 검증 실패 시 카운트 증가
      setVerifyFailCount((prev) => {
        const next = prev + 1;
        if (next >= MAX_VERIFY_ATTEMPTS) {
          alert(t('alert_otp_verify_max_fail'));
        }
        return next;
      });

      const message =
        error instanceof Verify2FAError
          ? error.userMessage
          : t('login_wrong_otp');

      form.setError("otp", {
        type: "manual",
        message: `${message} (${Math.min(verifyFailCount + 1, MAX_VERIFY_ATTEMPTS)}/${MAX_VERIFY_ATTEMPTS})`,
      });
    } finally {
      setVerifyPending(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('double_verify_title')}</DialogTitle>
          <DialogDescription>
            {isEmailType || isPhoneType
              ? t("otp_sent_to_target", {
                  target: isEmailType ? t("target_email") : t("target_phone"),
                })
              : t("otp_sent_to_phone", { phone })}
            <br />
            {t("login_otp_input")}
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
                  <InputOTPSlot className="bg-white dark:bg-black" index={0} />
                  <InputOTPSlot className="bg-white dark:bg-black" index={1} />
                  <InputOTPSlot className="bg-white dark:bg-black" index={2} />
                  <InputOTPSlot className="bg-white dark:bg-black" index={3} />
                  <InputOTPSlot className="bg-white dark:bg-black" index={4} />
                  <InputOTPSlot className="bg-white dark:bg-black" index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button
                type="submit"
                disabled={verifyPending}
              >
                {verifyPending ? t('confirm_pending') : t('btn_confirm')}
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
                ? `${t('login_otp_remain_time')} ${formatTime(timeLeft)}`
                : t('login_otp_expired_time')}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleResend}
              className="text-sm bg-sub150 text-sub700 hover:bg-sub200 hover:text-sub800"
              disabled={resendPending}
            >
              {resendPending ? t('login_otp_resend_pending') : t('login_otp_resend')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

