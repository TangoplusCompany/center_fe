import { customAxios } from "@/lib/axios";

export const postLogout = async () => {
  const response = await customAxios.post("/auth/logout", null, {
    withCredentials: true,
  });
  document.cookie = "isLogin=false; path=/; max-age=0";
  return response.data;
};
