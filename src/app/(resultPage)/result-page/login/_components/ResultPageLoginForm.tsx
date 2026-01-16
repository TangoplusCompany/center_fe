"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

const resultPageLoginSchema = z.object({
  phone: z
    .string()
    .min(10, { message: "전화번호는 최소 10자리 이상입니다." })
    .max(15, { message: "전화번호는 최대 15자리 이하입니다." })
    .regex(/^\d{10,15}$/, "전화번호는 숫자만 입력 가능합니다."),
  pin: z
    .string()
    .min(4, { message: "PIN 번호는 최소 4자리 이상입니다." })
    .max(8, { message: "PIN 번호는 최대 8자리 이하입니다." })
    .regex(/^\d+$/, "PIN 번호는 숫자만 입력 가능합니다."),
});

const ErrorText = ({ children }: { children: ReactNode }) => {
  return <p className="text-sm text-red-500">{children}</p>;
};

export default function ResultPageLoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resultPageLoginSchema),
  });

  const loginHandleSubmit = handleSubmit(async (data) => {
    try {
      // 임의 값으로 로그인 처리
      const validPhone = "01012345678";
      const validPin = "1234";
      
      if (data.phone === validPhone && data.pin === validPin) {
        // 로그인 성공 시 쿠키 설정
        document.cookie = "resultPageLogin=true; path=/; max-age=86400"; // 24시간
        
        // 임시 값들을 쿼리 파라미터로 전달
        const userUUID = "17PRWCXV743ZAEKQ";
        const key = "2225";
        const name = "1601";
        
        const queryParams = new URLSearchParams({
          userUUID,
          key,
          name,
        });
        
        router.push(`/result-page?${queryParams.toString()}`);
      } else {
        alert("로그인에 실패했습니다. 핸드폰 번호와 PIN 번호를 확인해주세요.");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다. 핸드폰 번호와 PIN 번호를 확인해주세요.");
    }
  });

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={loginHandleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">결과 페이지 로그인</h1>
        <p className="text-balance text-sm text-muted-foreground">
          핸드폰 번호와 PIN 번호를 입력하여 로그인해주세요.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="phone">핸드폰 번호</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="하이픈(-)없이 입력해주세요"
            maxLength={15}
            required
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
            maxLength={8}
            required
            className="bg-white dark:bg-border"
            {...register("pin")}
          />
          {errors.pin?.message && (
            <ErrorText>{String(errors.pin?.message)}</ErrorText>
          )}
        </div>
        <Button variant="outline" type="submit" className="w-full">
          로그인
        </Button>
      </div>
    </form>
  );
}

