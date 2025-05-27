import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

export const postLogout = async () => {
  const response = await customAxios.post<IResponseDefault>("/auth/logout", null, {
    withCredentials: true,
  });
  document.cookie = "isLogin=false; path=/; max-age=0";
  return response.data;
};
