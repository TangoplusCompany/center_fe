import { z } from "zod";

export const managerPasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "현재 비밀번호를 입력해주세요."),
    newPassword: z
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
    if (arg.newPassword !== arg.confirmPassword) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호가 일치하지 않습니다.",
        path: ["confirmPassword"],
      });
    }
    if (arg.currentPassword === arg.newPassword) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "현재 비밀번호와 새 비밀번호가 같습니다.",
        path: ["newPassword"],
      });
    }
  });

export type IManagerPasswordForm = z.infer<typeof managerPasswordSchema>;

export const managerInformationSchema = z.object({
  managerName: z
    .string()
    .min(1, { message: "이름을 입력해주세요." })
    .regex(/^[가-힣]+$/, {
      message: "한글 낱말만 입력 가능합니다.",
    }),
  managerMobile: z
    .string()
    .regex(/^\d{3}-\d{3,4}-\d{4}$/, {
      message: "전화번호 형식이 올바르지 않습니다.",
    })
    .regex(/^[0-9-]+$/, {
      message: "숫자와 하이픈(-)만 입력해주세요.",
    })
    .transform((value) => value.replace(/-/g, "")),
});
export type IManagerInformationForm = z.infer<typeof managerInformationSchema>;
