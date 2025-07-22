import { z } from "zod";

/**
 * 사용자 검색 스키마
 */
export const userSearchSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "이름을 입력해주세요.",
    })
    .regex(/^[가-힣a-zA-Z0-9\s]+$/, {
      message: "한글, 영어, 숫자, 띄어쓰기만 입력해주세요.",
    }),
});

export type IUserSearchForm = z.infer<typeof userSearchSchema>;