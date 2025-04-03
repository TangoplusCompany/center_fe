"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email({ message: "이메일 형식이 올바르지 않습니다." }),
  password: z
    .string()
    .min(8, {
      message: "비밀번호는 최소 8글자 이상입니다.",
    })
    .max(16, {
      message: "비밀번호는 최대 16글자 이하입니다.",
    })
    .regex(/^[a-zA-Z0-9!@#$%^&*]+$/, {
      message:
        "비밀번호는 대소문자, 숫자, 특수문자(!,@,#,$,%,^,&,*) 만 사용 가능합니다.",
    }),
});

const ErrorText = ({ children }: { children: ReactNode }) => {
  return <p className="text-sm text-red-500">{children}</p>;
};

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const [failMessage, setFailMessage] = useState<string>("");

  const loginHandleSubmit = handleSubmit(async (data) => {
    const result = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (result.status === 401) {
      setFailMessage(
        "이메일 혹은 비밀번호가 잘못 되었습니다.\n이메일과 비밀번호를 정확히 입력해 주세요."
      );
      return;
    } else if (result.status === 201) {
      router.replace("/");
    } else {
      setFailMessage(
        "서버에 일시적인 에러가 발생하였습니다. 잠시 후 다시 시도바랍니다."
      );
      return;
    }
  });
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={loginHandleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">탱고플러스 센터관리자 로그인</h1>
        <p className="text-balance text-sm text-muted-foreground">
          이메일형식의 아이디를 입력하여 로그인해주세요.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="text"
            placeholder="email@example.com"
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
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              비밀번호를 잊어버리셨나요?
            </a>
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
        {failMessage && <ErrorText>{failMessage}</ErrorText>}
        <Button type="submit" variant={"outline"} className="w-full">
          로그인
        </Button>
      </div>
      <div className="text-center text-sm">
        신규 관리자 이신가요?{" "}
        <Link href="/register" className="underline underline-offset-4">
          회원가입
        </Link>
      </div>
    </form>
  );
}
