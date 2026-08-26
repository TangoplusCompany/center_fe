"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { useUserLogin } from "@/hooks/api/ResultUser/useUserLogin";

// GS 인증: 결과 페이지 로그인은 휴대폰 숫자 11자리와 PIN 숫자 4자리만 허용한다.
const resultPageLoginSchema = z.object({
  phone: z
    .string()
    .min(1, { message: "휴대폰 번호를 입력해주세요." })
    .regex(/^\d{11}$/, "휴대폰 번호 11자리를 입력해주세요."),
  pin: z
    .string()
    .min(1, { message: "PIN 번호를 입력해주세요." })
    .regex(/^\d{4}$/, "PIN 번호 4자리를 입력해주세요."),
});

const ErrorText = ({ children }: { children: ReactNode }) => {
  return <p className="text-sm text-red-500">{children}</p>;
};

export default function ResultPageLoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(resultPageLoginSchema),
  });

  const { mutate: login, isPending } = useUserLogin(setError);

  const loginHandleSubmit = handleSubmit((data) => {
    login({
      mobile: data.phone,
      pin_password: data.pin,
    });
  });

  // GS 인증: 브라우저별 기본 문구 대신 제품에 정의된 네 가지 입력 오류 문구를 표시한다.
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={loginHandleSubmit}
      noValidate
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">결과 페이지 로그인</h1>
        <p className="text-balance text-sm text-muted-foreground">
          휴대폰 번호와 PIN 번호를 입력하여 로그인해주세요.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="phone">휴대폰 번호</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="하이픈(-)없이 입력해주세요"
            maxLength={11}
            inputMode="numeric"
            autoComplete="off"
            {...register("phone")}
            className="bg-white dark:bg-border"
          />
          {errors.phone?.message && (
            <ErrorText>{String(errors.phone?.message)}</ErrorText>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pin">PIN 번호</Label>
          <Input
            id="pin"
            type="password"
            placeholder="PIN 번호를 입력해주세요"
            maxLength={4}
            inputMode="numeric"
            autoComplete="off"
            className="bg-white dark:bg-border"
            {...register("pin")}
          />
          {errors.pin?.message && (
            <ErrorText>{String(errors.pin?.message)}</ErrorText>
          )}
        </div>
        <Button 
          variant="outline" 
          type="submit" 
          className="w-full"
          disabled={isPending}
        >
          {isPending ? "로그인 중..." : "로그인"}
        </Button>
      </div>
    </form>
  );
}
