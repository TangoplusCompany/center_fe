import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useResetPwd } from "@/hooks/api/auth/useResetPwd";

const ResetPwd = ({ jwt, email }: { jwt: string; email: string }) => {
  const formSchema = z
    .object({
      password: z
        .string()
        .min(1, "새 비밀번호를 입력해주세요.")
        .min(8, "비밀번호는 최소 8글자 이상이여야 합니다.")
        .max(16, "비밀번호는 최대 16글자 이하여야 합니다.")
        .regex(
          /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]+$/i,
          "비밀번호는 영문, 숫자, ! ~ * 특수문자를 최소 1자리 이상 입력해야합니다.",
        ),
      confirmPassword: z
        .string()
        .min(1, "비밀번호 확인을 입력해주세요.")
        .min(8, "비밀번호는 최소 8글자 이상이여야 합니다.")
        .max(16, "비밀번호는 최대 16글자 이하여야 합니다.")
        .regex(
          /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]+$/i,
          "비밀번호는 영문, 숫자, ! ~ * 특수문자를 최소 1자리 이상 입력해야합니다.",
        ),
    })
    .superRefine((arg, ctx) => {
      if (arg.password !== arg.confirmPassword) {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "비밀번호가 일치하지 않습니다.",
          path: ["confirmPassword"],
        });
      }
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const { mutate: resetPwd } = useResetPwd();

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const password = data.password;
    resetPwd({
      jwt,
      new_password: password,
      email_or_mobile: email,
      type: "email",
      purpose: "password",
    });
  };
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-2"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">신규 비밀번호</Label>
        <Input
          {...form.register("password")}
          type="password"
          id="password"
          defaultValue=""
          placeholder="새 비밀번호"
          className="bg-white"
        />
        {form.formState.errors.password?.message && (
          <p className="text-sm text-red-500">
            {form.formState.errors.password.message.toString()}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="confirmPassword">비밀번호 확인</Label>
        <Input
          {...form.register("confirmPassword")}
          type="password"
          id="confirmPassword"
          defaultValue=""
          placeholder="비밀번호 확인"
          className="bg-white"
        />
        {form.formState.errors.confirmPassword?.message && (
          <p className="text-sm text-red-500">
            {form.formState.errors.confirmPassword.message.toString()}
          </p>
        )}
      </div>
      <Button type="submit">비밀번호 변경</Button>
    </form>
  );
};

export default ResetPwd;
