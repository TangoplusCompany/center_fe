import * as z from "zod";

/**
 * 센터 정보 수정 스키마
 */
export const centerEditSchema = z.object({
  centerName: z
    .string()
    .min(1, { message: "센터 이름을 입력해주세요." })
    .regex(/^[가-힣a-zA-Z0-9\s-]+$/, {
      message: "한글, 영어, 숫자, 띄어쓰기, 하이픈(-)만 입력해주세요.",
    }),
  centerAddress: z
    .string()
    .min(1, { message: "센터 주소를 입력해주세요." })
    .regex(/^[가-힣a-zA-Z0-9\s-]+$/, {
      message: "한글, 영어, 숫자, 띄어쓰기, 하이픈(-)만 입력해주세요.",
    }),
  centerAddressDetail: z
    .string()
    .regex(/^[가-힣a-zA-Z0-9\s-]+$/, {
      message: "한글, 영어, 숫자, 띄어쓰기, 하이픈(-)만 입력해주세요.",
    })
    .optional(),
});

export type ICenterEditForm = z.infer<typeof centerEditSchema>;