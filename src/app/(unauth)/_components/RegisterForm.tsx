"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState } from "react";
import { useRegister } from "@/hooks/auth/useRegister";

const registerSchema = z
  .object({
    email: z.string().email({ message: "이메일 형식이 올바르지 않습니다." }),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8글자 이상이여야 합니다.")
      .max(16, "비밀번호는 최대 16글자 이하여야 합니다.")
      .regex(
        /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]+$/i,
        "비밀번호는 영문, 숫자, ! ~ * 특수문자를 최소 1자리 이상 입력해야합니다.",
      ),
    passwordConfirm: z
      .string()
      .min(8, "비밀번호는 최소 8글자 이상이여야 합니다.")
      .max(16, "비밀번호는 최대 16글자 이하여야 합니다.")
      .regex(
        /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]+$/i,
        "비밀번호는 영문, 숫자, ! ~ * 특수문자를 최소 1자리 이상 입력해야합니다.",
      ),
    name: z
      .string()
      .min(2, "이름은 최소 2글자 이상이여야 합니다.")
      .regex(/^[가-힣]+$/, "이름은 한글(낱말)만 입력 가능합니다."),
    phone: z
      .string()
      .min(10, "전화번호는 최소 10글자 이상이여야 합니다.")
      .regex(/^01[0-9]\d{4}\d{4}$/, "전화번호 형식이 올바르지 않습니다."),
  })
  .superRefine((arg, ctx) => {
    if (arg.password !== arg.passwordConfirm) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호가 일치하지 않습니다.",
        path: ["passwordConfirm"],
      });
    }
  });

// 에러메시지 커스텀
const ErrorText = ({ children }: { children: ReactNode }) => {
  return <p className="text-sm text-red-500 text-start">{children}</p>;
};

export const RegisterContainer = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const registerMutation = useRegister(setError);
  const registerHandleSubmit = handleSubmit(async (data) => {
    registerMutation.mutateAsync({
      email: data.email,
      password: data.password,
      name: data.name,
      mobile: data.phone,
    });
  });
  return (
    <form className={cn("flex flex-col gap-6 w-full")} onSubmit={registerHandleSubmit}>
      <div className="flex flex-col items-center gap-5 text-center">
        <legend className="sr-only">센터관리자 회원가입</legend>
        <h1 className="text-2xl font-bold">탱고플러스 센터관리자 회원가입</h1>
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="text"
              placeholder="email@example.com"
              required
              {...register("email")}
              className="bg-white dark:bg-border"
            />
            {errors.email?.message && <ErrorText>{String(errors.email?.message)}</ErrorText>}
          </div>
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="password">비밀번호</Label>

            <Input
              id="password"
              type="password"
              placeholder="********"
              required
              className="bg-white dark:bg-border"
              {...register("password")}
            />
            {errors.password?.message && <ErrorText>{String(errors.password?.message)}</ErrorText>}
          </div>
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="passwordConfirm">비밀번호 확인</Label>

            <Input
              id="passwordConfirm"
              type="password"
              placeholder="********"
              required
              className="bg-white dark:bg-border"
              {...register("passwordConfirm")}
            />
            {errors.passwordConfirm?.message && (
              <ErrorText>{String(errors.passwordConfirm?.message)}</ErrorText>
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              type="text"
              placeholder="홍길동"
              required
              {...register("name")}
              className="bg-white dark:bg-border"
            />
            {errors.name?.message && <ErrorText>{String(errors.name?.message)}</ErrorText>}
          </div>
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="phone">전화번호</Label>
            <Input
              id="phone"
              type="text"
              placeholder="하이픈(-)없이 입력해주세요."
              required
              {...register("phone")}
              className="bg-white dark:bg-border"
            />
            {errors.phone?.message && <ErrorText>{String(errors.phone?.message)}</ErrorText>}
          </div>
          <Button type="submit" variant={"outline"} className="w-full">
            로그인
          </Button>
        </div>
      </div>
    </form>
  );
};
