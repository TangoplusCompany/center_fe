import { z } from "zod";

/**
 * 기기 상세 정보 수정 스키마
 */
export const deviceDetailSchema = z.object({
  device_name: z
    .string()
    .min(1, {
      message: "기기 이름을 입력해주세요.",
    })
    .regex(/^[가-힣a-zA-Z0-9\s-]+$/, {
      message: "한글, 영어, 숫자, 띄어쓰기, 하이픈(-)만 입력해주세요.",
    }),
  install_address_1: z.string().regex(/^[가-힣a-zA-Z0-9\s-]+$/, {
    message: "한글, 영어, 숫자, 띄어쓰기, 하이픈(-)만 입력해주세요.",
  }),
  install_address_2: z.string().regex(/^[가-힣a-zA-Z0-9\s-]+$/, {
    message: "한글, 영어, 숫자, 띄어쓰기, 하이픈(-)만 입력해주세요.",
  }),
  install_location: z
    .string()
    .min(1, {
      message: "기기 설치 장소를 입력해주세요.",
    })
    .regex(/^[가-힣a-zA-Z0-9\s-]+$/, {
      message: "한글, 영어, 숫자, 띄어쓰기, 하이픈(-)만 입력해주세요.",
    }),
});

export type IDeviceDetailForm = z.infer<typeof deviceDetailSchema>;

/**
 * 기기 검색 스키마
 */
export const deviceSearchSchema = z.object({
  serial_number: z
    .string()
    .min(10, { message: "시리얼 넘버는 6자리 이상이어야 합니다." })
    .regex(/^[a-zA-Z0-9-]+$/, {
      message: "영어 대소문자, 숫자, 하이픈(-)만 입력해주세요.",
    }),
});

export type IDeviceSearchForm = z.infer<typeof deviceSearchSchema>;