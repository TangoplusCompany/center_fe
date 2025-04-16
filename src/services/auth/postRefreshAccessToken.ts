import { customUnAuthAxios } from "@/lib/axios";

/**
 * 쿠키에 값을 저장해두고, 해당 쿠키를 이용해서 요청 받기
 * @returns Promise{ accessToken: string, refreshToken: string }
 */
export const refreshAccessToken = async () => {
  const res = await customUnAuthAxios.post("/auth/refresh", null, {
    withCredentials: true,
  });
  return res.data; // { accessToken: "..." }
};
