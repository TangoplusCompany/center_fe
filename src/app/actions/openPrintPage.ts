"use server";

export const getResultReportUrl = async (encrypted: string): Promise<string> => {
  // const REPORT_PRINT_CATEGORY = 7; // 실제 카테고리 값 맞추기

  if (!encrypted) {
    throw new Error("Encrypted string is missing");
  }

  const baseUrl = process.env.NEXT_PUBLIC_PRINT_URL as string;
  const t_r = encodeURIComponent(encrypted);

  // return `${baseUrl}?category=${REPORT_PRINT_CATEGORY}&t_r=${t_r}`;

  return `${baseUrl}?t_r=${t_r}`;
};
