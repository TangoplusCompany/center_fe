import { z } from "zod";

/**
 * 매니저 비밀번호 변경 스키마
 */
export const managerPasswordSchema = (t: (key: string) => string) => z
  .object({
    currentPassword: z.string().min(1, "현재 비밀번호를 입력해주세요."),
    newPassword: z
      .string()
      .min(1, "새 비밀번호를 입력해주세요.")
      .min(8, t('pw_min'))
      .max(16, t('pw_max'))
      .regex(
        /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]+$/i,
        t('pw_zod'),
      ),
    confirmPassword: z
      .string()
      .min(8, t('pw_min'))
      .max(16, t('pw_max'))
      .regex(
        /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]+$/i,
        t('pw_zod'),
      ),
  })
  .superRefine((arg, ctx) => {
    if (arg.newPassword !== arg.confirmPassword) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('pw_invalid'),
        path: ["confirmPassword"],
      });
    }
    if (arg.currentPassword === arg.newPassword) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('pw_previous_same'),
        path: ["newPassword"],
      });
    }
  });

export type IManagerPasswordForm =  z.infer<
  ReturnType<typeof managerPasswordSchema>
>;

/**
 * 매니저 정보 수정 스키마
 */
export const managerInformationSchema = (t: (key: string) => string) =>
  z.object({
    managerName: z
      .string()
      .min(2, { message: t("validation_user_name_min") })
      .max(50, { message: t("validation_user_name_max") })
      .regex(/^[가-힣]+$/, { message: t("name_zod") }),
    managerMobile: z
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
  });

export type IManagerInformationForm = z.infer<
  ReturnType<typeof managerInformationSchema>
>;