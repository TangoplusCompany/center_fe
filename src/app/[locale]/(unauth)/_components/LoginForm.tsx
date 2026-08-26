"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOtpDialog } from "@/hooks/api/auth/useOtpDialog";
import { postLoginFor2FA, AdminLoginError } from "@/services/auth/postLogin";
import { Login2FAMethodDialog } from "@/components/auth/Login2FAMethodDialog";
import type { Login2FAMethod } from "@/components/auth/Login2FAMethodDialog";
import { LoginOtpDialog } from "@/components/auth/LoginOtpDialog";
import { useLocale, useTranslations } from "next-intl";
import { Globe, Check } from "lucide-react";



const ErrorText = ({ children }: { children: ReactNode }) => {
  return <p className="text-sm text-red-500">{children}</p>;
};

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();
  const t = useTranslations("Index");

  const currentLocale = useLocale();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const [is2FADialogOpen, setIs2FADialogOpen] = useState(false);
  const [tempJwt, setTempJwt] = useState<string | null>(null);
  const [loginDataFor2FA, setLoginDataFor2FA] = useState<{
    email: string;
    password: string;
  } | null>(null);
  const [isLoginPending, setIsLoginPending] = useState(false);

  const {
    isOtpDialogOpen,
    phone,
    loginData,
    tempJwt: otpDialogTempJwt,
    updateTempJwt,
    openDialog,
    closeDialog,
  } = useOtpDialog();

  const showUnlockLink = true;
  const loginSchema = z.object({
    email: z
      .string()
      .max(30, { message: t('email_max') })
      .email({ message: t('email_invalid') })
      .regex(
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
        t('email_zod')
      ),
    password: z
      .string()
      .min(8, {
        message: t('pw_min'),
      })
      .max(16, {
        message: t('pw_max'),
      })
      .regex(
        /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*~])[a-z\d!@#$%^&*~]+$/i,
        t('pw_zod'),
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // 언어 변경 핸들러
  const handleLanguageChange = (newLocale: string) => {
    setIsLangOpen(false);
    if (newLocale === currentLocale) return;

    // NEXT_LOCALE 쿠키 설정
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    
    // 페이지 새로고침
    window.location.reload();
  };

  const loginHandleSubmit = handleSubmit(async (data) => {
    setIsLoginPending(true);
    try {
      const res = await postLoginFor2FA({
        email: data.email,
        password: data.password,
        translate : t
      });
      setTempJwt(res.temp_jwt);
      setLoginDataFor2FA({ email: data.email, password: data.password });
      setIs2FADialogOpen(true);
    } catch (error) {
      if (error instanceof AdminLoginError) {
        alert(error.userMessage);
        return;
      }
      if (error instanceof Error) {
        alert(error.message);
        return;
      }
      alert(`${t('login_error_general')}`);
    } finally {
      setIsLoginPending(false);
    }
  });

  const handle2FANext = (method: Login2FAMethod, requestedTempToken: string) => {
    if (!loginDataFor2FA || !tempJwt) return;
    const contact = method === "email" ? t('setting_account_email') : t('setting_account_mobile');
    setTempJwt(requestedTempToken);
    updateTempJwt(requestedTempToken);
    openDialog(contact, loginDataFor2FA, requestedTempToken);
  };

  return (
    <>
      <form
        className={cn("flex flex-col gap-6 relative", className)}
        {...props}
        onSubmit={loginHandleSubmit}
      >
        {/* 🌐 우측 상단 다국어 선택 드롭다운 */}
        <div className="flex justify-end relative">
          <button
            type="button"
            onClick={() => setIsLangOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-border hover:bg-sub100 dark:hover:bg-sub800 transition-colors"
          >
            <Globe className="w-4 h-4 text-sub500" />
            <span>{currentLocale === "ko" ? "한국어" : "English"}</span>
          </button>

          {isLangOpen && (
            <>
              {/* 바깥 클릭 시 닫히는 오버레이 */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsLangOpen(false)}
              />
              {/* 드롭다운 팝업 메뉴 */}
              <div className="absolute right-0 top-full mt-1.5 w-32 bg-white dark:bg-sub900 border border-sub200 dark:border-sub700 rounded-xl shadow-lg z-50 py-1 overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleLanguageChange("ko")}
                  className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-sub100 dark:hover:bg-sub800 transition-colors ${
                    currentLocale === "ko"
                      ? "font-semibold text-mainBlue-600 dark:text-mainBlue-400"
                      : "text-sub700 dark:text-sub200"
                  }`}
                >
                  <span>한국어</span>
                  {currentLocale === "ko" && <Check className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange("en")}
                  className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-sub100 dark:hover:bg-sub800 transition-colors ${
                    currentLocale === "en"
                      ? "font-semibold text-mainBlue-600 dark:text-mainBlue-400"
                      : "text-sub700 dark:text-sub200"
                  }`}
                >
                  <span>English</span>
                  {currentLocale === "en" && <Check className="w-3.5 h-3.5" />}
                </button>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{t("login_title")}</h1>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              placeholder="email@example.com"
              maxLength={30}
              required
              {...register("email")}
              className="bg-white dark:bg-border"
            />
            {errors.email?.message && (
              <ErrorText>{String(errors.email?.message)}</ErrorText>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/find"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                {t("login_forgot_pw")}
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="********"
              required
              className="bg-white dark:bg-border"
              {...register("password")}
            />
            {errors.password?.message && (
              <ErrorText>{String(errors.password?.message)}</ErrorText>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              type="submit"
              className="w-full"
              disabled={isLoginPending}
            >
              {isLoginPending ? t("login_pending") : t("login")}
            </Button>
          </div>
        </div>
        {showUnlockLink && (
          <div className="text-center text-sm">
            <button
              type="button"
              onClick={() => router.push("/unlock")}
              className="text-sm underline-offset-4 hover:underline text-foreground dark:text-white"
            >
              {t("login_lock")}
            </button>
          </div>
        )}
        <div className="text-center text-sm">
          {t("login_signup_0")}{" "}
          <Link href="/register" className="underline underline-offset-4">
            {t("login_signup_1")}
          </Link>
        </div>
      </form>

      {/* 다이얼로그는 form 밖에 렌더링 */}
      {tempJwt && (
        <Login2FAMethodDialog
          open={is2FADialogOpen}
          onOpenChange={setIs2FADialogOpen}
          tempJwt={tempJwt}
          onNext={handle2FANext}
        />
      )}

      {loginData && otpDialogTempJwt && (
        <LoginOtpDialog
          open={isOtpDialogOpen}
          onOpenChange={(open) => {
            if (!open) closeDialog();
          }}
          phone={phone}
          tempJwt={otpDialogTempJwt}
          onTempJwtChange={(jwt) => {
            setTempJwt(jwt);
            updateTempJwt(jwt);
          }}
        />
      )}
    </>
  );
}