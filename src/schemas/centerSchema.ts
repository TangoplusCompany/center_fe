import * as z from "zod";

/**
 * 센터 정보 수정 스키마
 */
export const centerEditSchema = z.object({
  centerName: z
    .string()
    .min(1, { message: "센터 이름을 입력해주세요." })
    .max(30, { message: "센터 이름은 최대 30자까지 입력 가능합니다." })
    .regex(/^[가-힣a-zA-Z0-9\s-_]+$/, {
      message: "한글, 영어, 숫자, 띄어쓰기, 하이픈(-), 언더스코어(_)만 입력해주세요.",
    }),
  centerAddress: z
    .string()
    .min(1, { message: "센터 주소를 입력해주세요." })
    .max(60, { message: "센터 주소는 최대 60자까지 입력 가능합니다." })
    .regex(/^[가-힣a-zA-Z0-9\s-]+$/, {
      message: "한글, 영어, 숫자, 띄어쓰기, 하이픈(-)만 입력해주세요.",
    }),
  centerAddressDetail: z
    .string()
    .max(30, { message: "센터 상세 주소는 최대 30자까지 입력 가능합니다." })
    .regex(/^[가-힣a-zA-Z0-9\s-]*$/, {
      message: "한글, 영어, 숫자, 띄어쓰기, 하이픈(-)만 입력해주세요.",
    })
    .optional(),
  centerPhone: z
    .string()
    .max(20, { message: "센터 번호는 최대 20자까지 입력 가능합니다." })
    .regex(/^[0-9\s-]*$/, {
      message: "숫자, 띄어쓰기, 하이픈(-)만 입력해주세요.",
    })
    .optional(),
});

export type ICenterEditForm = z.infer<typeof centerEditSchema>;