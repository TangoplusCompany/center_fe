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
            {...register("password")}
          />
          {errors.password?.message && (
            <ErrorText>{String(errors.password?.message)}</ErrorText>
          )}
        </div>
        {failMessage && <ErrorText>{failMessage}</ErrorText>}
        <Button type="submit" className="w-full">
          로그인
        </Button>
        {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Login with GitHub
        </Button> */}
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
