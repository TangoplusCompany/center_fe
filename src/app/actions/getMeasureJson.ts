"use server";

import { customJsonAxios } from "@/lib/axios";

export async function getMeasureJson(json_path: string) {
  const response = await customJsonAxios.get(`/${json_path}`);
  return await response.data;
}
