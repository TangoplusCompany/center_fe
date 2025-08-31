import { z } from "zod";

/**
 * 매니저 비밀번호 변경 스키마
 */
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

/**
 * 매니저 정보 수정 스키마
 */
export const managerInformationSchema = z.object({
  managerName: z
    .string()
    .min(2, { message: "이름은 최소 2자 이상이어야 합니다." })
    .max(50, { message: "이름은 최대 50자까지 입력 가능합니다." })
    .regex(/^[가-힣]+$/, { message: "이름은 한글만 입력 가능합니다." }),
  managerMobile: z
    .string()
    .regex(/^\d+$/, { message: "전화번호는 숫자만 입력 가능합니다." })
    .min(10, { message: "전화번호는 최소 10자 이상이어야 합니다." })
    .max(15, { message: "전화번호는 최대 15자까지 입력 가능합니다." }),
    
});
export type IManagerInformationForm = z.infer<typeof managerInformationSchema>;
