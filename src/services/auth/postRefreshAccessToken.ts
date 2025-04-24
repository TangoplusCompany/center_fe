import { customUnAuthAxios } from "@/lib/axios";

/**
 * 쿠키에 값을 저장해두고, 해당 쿠키를 이용해서 요청 받기
 * @returns Promise{ success: boolean, status: number, message: string[], data: {access_jwt: string} }
 */
export const refreshAccessToken = async () => {
  const res = await customUnAuthAxios.post("/auth/refresh", null, {
    withCredentials: true,
  });
  return res.data;
};
