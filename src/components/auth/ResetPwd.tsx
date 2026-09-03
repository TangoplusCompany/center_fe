import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useResetPwd } from "@/hooks/api/auth/useResetPwd";
import { useTranslations } from "next-intl";

const ResetPwd = ({ jwt, email }: { jwt: string; email: string }) => {
  const t = useTranslations("Index");
  const formSchema = z
    .object({
      password: z
        .string()
        .min(1, t('reset_pw_hint'))
        .min(8, t('pw_min'))
        .max(16, t('pw_max'))
        .regex(
          /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*~])[a-z\d!@#$%^&*~]+$/i,
          t('pw_zod'),
        ),
      confirmPassword: z
        .string()
        .min(1, t('reset_pw_confim_input'))
        .min(8, t('pw_min'))
        .max(16, t('pw_max'))
        .regex(
          /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*~])[a-z\d!@#$%^&*~]+$/i,
          t('pw_zod'),
        ),
    })
    .superRefine((arg, ctx) => {
      if (arg.password !== arg.confirmPassword) {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('reset_mismatch'),
          path: ["confirmPassword"],
        });
      }
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // ← 입력할 때마다 실시간 유효성 검사 실행
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
        <Label htmlFor="password">{t('reset_new_pw')}</Label>
        <Input
          {...form.register("password")}
          type="password"
          id="password"
          maxLength={16}
          defaultValue=""
          placeholder={t('reset_new_pw')}
          className="bg-white"
        />
        {form.formState.errors.password?.message && (
          <p className="text-sm text-red-500">
            {form.formState.errors.password.message.toString()}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="confirmPassword">{t('reset_pw_confirm')}</Label>
        <Input
          {...form.register("confirmPassword")}
          type="password"
          id="confirmPassword"
          maxLength={16}
          defaultValue=""
          placeholder={t('reset_pw_confirm')}
          className="bg-white"
        />
        {form.formState.errors.confirmPassword?.message && (
          <p className="text-sm text-red-500">
            {form.formState.errors.confirmPassword.message.toString()}
          </p>
        )}
      </div>
      <Button type="submit" className="mt-4">{t('reset_pw')}</Button>
    </form>
  );
};

export default ResetPwd;
