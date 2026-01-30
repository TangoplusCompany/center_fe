import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

/**
 * 로그아웃 API
 * @returns 로그아웃 응답
 */
export const postLogout = async () => {
  const response = await customAxios.post<IResponseDefault>("/auth/logout", null, {
    withCredentials: true,
  });
  document.cookie = "isLogin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
  
  return response.data;
};
