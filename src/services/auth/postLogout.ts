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
  document.cookie = "isLogin=false; path=/; max-age=0";
  return response.data;
};
