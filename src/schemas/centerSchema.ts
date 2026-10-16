import * as z from "zod";
import { isValidKoreanPhone } from "@/utils/validateKoreanPhone";

/**
 * 센터 정보 수정 스키마
 */
export const createCenterEditSchema = (t?: (key: string) => string) =>
  z.object({
    centerName: z
      .string()
      .min(1, { message: t ? t("label_center_name") : "Please enter center name." })
      .max(30, { message: "Center name must be 30 characters or less." })
      .regex(/^[가-힣a-zA-Z0-9\s-_]+$/, {
        message: "Only letters, numbers, spaces, hyphens(-), and underscores(_) are allowed.",
      }),
    centerAddress: z
      .string()
      .min(1, { message: "Please enter center address." })
      .max(60, { message: "Center address must be 60 characters or less." })
      .regex(/^[가-힣a-zA-Z0-9\s-]+$/, {
        message: "Only letters, numbers, spaces, and hyphens are allowed.",
      }),
    centerAddressDetail: z
      .string()
      .max(30, { message: "Center detailed address must be 30 characters or less." })
      .regex(/^[가-힣a-zA-Z0-9\s-]*$/, {
        message: "Only letters, numbers, spaces, and hyphens are allowed.",
      })
      .optional(),
    centerPhone: z
      .string()
      .regex(/^\d*$/, { message: "Only numbers are allowed." })
      .refine(
        (val) => !val || val.length === 0 || isValidKoreanPhone(val),
        { message: t ? t("telephone_zod") : "Phone number must be valid." },
      )
      .optional(),
  });

export const centerEditSchema = createCenterEditSchema();

export type ICenterEditForm = z.infer<typeof centerEditSchema>;