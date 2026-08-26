"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { postRegisterSubAdmin } from "@/services/auth/postRegisterSubAdmin";
import { useTranslations } from "next-intl";

/** 부관리자 회원가입 API 실패 시 상태별 안내 메시지 */
function getRegisterSubAdminErrorMessage(error: unknown, t: (key: string) => string): string {
  if (error instanceof AxiosError && error.response?.status) {
    switch (error.response.status) {
      case 400:
        return t('alert_sub_admin_error_400');
      case 401:
        return t('alert_sub_admin_error_429');
      case 409:
        return t('alert_sub_admin_error_423');
      case 500:
        return t('alert_sub_admin_error_500');
      default:
        break;
    }
  }
  return t('alert_sub_admin_error');
}

const subRegisterSchema = (t: (key: string) => string) => z
  .object({
    email: z
      .string()
      .max(30, { message: t('email_max') })
      .email({ message: t('email_invalid') }),
    password: z
      .string()
      .min(8, t('pw_min'))
      .max(16, t('pw_max'))
      .regex(
        /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*~])[a-z\d!@#$%^&*~]+$/i,
        t('pw_zod'),
      ),
    passwordConfirm: z
      .string()
      .min(8, t('pw_min'))
      .max(16, t('pw_max'))
      .regex(
        /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*~])[a-z\d!@#$%^&*~]+$/i,
        t('pw_zod'),
      ),
    name: z
      .string()
      .min(2, t('name_min'))
      .max(50, t('name_max'))
      .regex(
        /^[가-힣a-zA-Z\s]+$/, 
        t('name_zod')
      ),
    phone: z
      .string()
      .trim()
      .min(1, t('mobile_hint'))
      // +, 숫자, 공백, 하이픈 허용
      .refine((val) => /^\+?[0-9\s-]+$/.test(val), {
        message: t('mobile_zod'),
      })
      // 맨 앞 '+' 제외 나머지 숫자 이외의 문자 제거
      .transform((val) => val.replace(/(?!^\+)\D/g, ""))
      .pipe(
        z
          .string()
          // 국가번호 포함 국제 표준(E.164) 최소 7자리 ~ 최대 15자리 (앞의 '+' 제외)
          .refine((val) => {
            const digitsOnly = val.replace(/^\+/, "");
            return digitsOnly.length >= 7 && digitsOnly.length <= 15;
          }, { message: t('mobile_min_max') })
      )
  })
  .superRefine((arg, ctx) => {
    if (arg.password !== arg.passwordConfirm) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('pw_invalid'),
        path: ["passwordConfirm"],
      });
    }
  });

type SubRegisterFormValues = z.infer<ReturnType<typeof subRegisterSchema>>;

const ErrorText = ({ children }: { children: ReactNode }) => {
  return <p className="text-sm text-red-500 text-start">{children}</p>;
};

export const SubRegisterContainer = ({
  token,
  email,
}: {
  token: string;
  email?: string;
}) => {
  const t = useTranslations("Index");
  const router = useRouter();
  const [submitPending, setSubmitPending] = useState(false);
  const currentRegisterSchema = useMemo(() => subRegisterSchema(t), [t]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SubRegisterFormValues>({
    resolver: zodResolver(currentRegisterSchema),
    mode: "onChange", // ← 입력할 때마다 실시간 유효성 검사 실행
    defaultValues: {
      email: email || "",
      password: "",
      passwordConfirm: "",
      name: "",
      phone: "",
    },
  });

  const password = watch("password");
  const passwordConfirm = watch("passwordConfirm");
  const name = watch("name");
  const phone = watch("phone");
  const emailValue = watch("email") ?? "";

  const isFormValid = useMemo(() => {
    return (
      isValid &&
      password &&
      passwordConfirm &&
      name &&
      phone &&
      password.length >= 8 &&
      passwordConfirm.length >= 8 &&
      name.length >= 2 &&
      /^\d{9,11}$/.test(phone.replace(/\D/g, "")) &&
      !errors.password &&
      !errors.passwordConfirm &&
      !errors.name &&
      !errors.phone
    );
  }, [isValid, password, passwordConfirm, name, phone, errors]);

  const registerHandleSubmit = handleSubmit(async (data) => {
    if (!token?.trim()) {
      alert(t('invite_invalid'));
      return;
    }
    setSubmitPending(true);
    try {
      await postRegisterSubAdmin({
        sub_admin_invitation_token: token,
        invitee_email: data.email.trim() || emailValue.trim(),
        mobile: data.phone,
        admin_name: data.name,
        password: data.password,
      });
      alert(t('signup_success'));
      router.push("/login");
    } catch (error) {
      alert(getRegisterSubAdminErrorMessage(error, t));
    } finally {
      setSubmitPending(false);
    }
  });

  return (
    <form
      className={cn("flex flex-col gap-6 w-full")}
      onSubmit={registerHandleSubmit}
    >
      <div className="flex flex-col items-center gap-5 text-center">
        <legend className="sr-only">{t('btn_signup')}</legend>
        <h1 className="text-2xl font-bold mb-3 lg:mb-5">
          <span className="block sm:inline">{t('signup_sub_admin_title')}</span>{" "}
          <span className="block sm:inline">{t('btn_signup')}</span>
        </h1>
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="email" className="lg:text-lg">
              {t('target_email')}
            </Label>
            <Input
              id="email"
              type="text"
              placeholder="email@example.com"
              required
              maxLength={30}
              readOnly
              disabled
              {...register("email")}
              className="bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
            />
            {errors.email?.message && (
              <ErrorText>{String(errors.email?.message)}</ErrorText>
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="password" className="lg:text-lg">
              {t('label_pw')}
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              required
              maxLength={16}
              className="bg-white dark:bg-border"
              {...register("password")}
            />
            {errors.password?.message && (
              <ErrorText>{String(errors.password?.message)}</ErrorText>
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="passwordConfirm" className="lg:text-lg">
              {t('label_pw_confirm')}
            </Label>
            <Input
              id="passwordConfirm"
              type="password"
              placeholder="********"
              required
              maxLength={16}
              className="bg-white dark:bg-border"
              {...register("passwordConfirm")}
            />
            {errors.passwordConfirm?.message && (
              <ErrorText>{String(errors.passwordConfirm?.message)}</ErrorText>
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="name" className="lg:text-lg">
              {t('label_name')}
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="홍길동"
              required
              maxLength={50}
              {...register("name")}
              className="bg-white dark:bg-border"
            />
            {errors.name?.message && (
              <ErrorText>{String(errors.name?.message)}</ErrorText>
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="phone" className="lg:text-lg">
              {t('label_mobile')}
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="01012345678"
              required
              {...register("phone", {
                required: t('mobile_hint'),
                // 🔥 숫자 11자리 정규식 검사
                pattern: {
                  value: /^010\d{8}$/,
                  message: "010으로 시작하는 11자리 숫자를 입력해주세요."
                },
                minLength: { value: 11, message: t('mobile_min_max') },
                maxLength: { value: 11, message: t('mobile_min_max') },
                onChange: (e) => {
                  // 1. 숫자 이외 문자 즉시 제거
                  const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
                  // 2. 11자까지만 잘라서 다시 input에 할당 (이게 가장 확실합니다)
                  e.target.value = onlyNumber.slice(0, 11);
                }
              })}
              className={cn(
                "bg-white dark:bg-border",
                errors.phone && "border-red-500 focus-visible:ring-red-500" // 에러 시 강조
              )}
            />
            {errors.phone?.message && (
              <ErrorText>{String(errors.phone?.message)}</ErrorText>
            )}
          </div>
          <Button
            type="submit"
            variant="outline"
            className="w-full lg:text-lg"
            disabled={!isFormValid || submitPending}
          >
            {submitPending ? t('status_signing_up') : t('btn_signup')}
          </Button>
        </div>
      </div>
    </form>
  );
};