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

const loginSchema = z.object({
  email: z
  .string()
  .max(30, { message: "이메일은 최대 30자까지 입력 가능합니다." })
  .email({ message: "이메일 형식이 올바르지 않습니다." }).regex(
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
    "이메일은 영문, 숫자, @ 특수문자만 입력 가능합니다.",
  ),
  password: z
    .string()
    .min(8, {
      message: "비밀번호는 최소 8글자 이상입니다.",
    })
    .max(16, {
      message: "비밀번호는 최대 16글자 이하입니다.",
    })
    .regex(
      /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]+$/i,
      "비밀번호는 영문, 숫자, ! ~ * 특수문자를 최소 1자리 이상 입력해야합니다.",
    ),
});

const ErrorText = ({ children }: { children: ReactNode }) => {
  return <p className="text-sm text-red-500">{children}</p>;
};

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const loginHandleSubmit = handleSubmit(async (data) => {
    setIsLoginPending(true);
    try {
      const res = await postLoginFor2FA({
        email: data.email,
        password: data.password,
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
      alert("로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsLoginPending(false);
    }
  });

  const handle2FANext = (method: Login2FAMethod, requestedTempToken: string) => {
    if (!loginDataFor2FA || !tempJwt) return;
    const contact =
      method === "email" ? "이메일" : "휴대폰";
    // request-2fa 성공 응답의 temp_token을 이후 Authorization 헤더에 사용
    setTempJwt(requestedTempToken);
    updateTempJwt(requestedTempToken);
    openDialog(contact, loginDataFor2FA, requestedTempToken);
  };

  return (
    <>
      <form
        className={cn("flex flex-col gap-6", className)}
        {...props}
        onSubmit={loginHandleSubmit}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">탱고플러스 센터관리자 로그인</h1>
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
                비밀번호를 잊어버리셨나요?
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
              {isLoginPending ? "로그인 중..." : "로그인"}
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
              계정이 잠기셨나요?
            </button>
          </div>
        )}
        <div className="text-center text-sm">
          신규 관리자 이신가요?{" "}
          <Link href="/register" className="underline underline-offset-4">
            회원가입
          </Link>
        </div>
      </form>

      {/* 다이얼로그는 form 밖에 렌더링 (중첩 form submit 버그 방지) */}
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
