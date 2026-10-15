import { z } from "zod";

/**
 * 사용자 검색 스키마
 */
export const createUserSearchSchema = (t?: (key: string) => string) =>
  z.object({
    name: z
      .string()
      .min(1, {
        message: t ? t("manager_search_hint") : "Please enter a name.",
      })
      .regex(/^[가-힣a-zA-Z0-9\s]+$/, {
        message: t ? t("manager_search_hint") : "Please enter letters, numbers, or spaces.",
      }),
  });

export const userSearchSchema = createUserSearchSchema();

export type IUserSearchForm = z.infer<typeof userSearchSchema>;