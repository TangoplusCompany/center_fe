"use server";

import axios from "axios";

export const postKakaoSend = async (data: string) => {
  const kakaoURL = process.env.NEXT_PUBLIC_KAKAO_URL as string;
  const response = await axios.post(`${kakaoURL}?link=${encodeURIComponent(data)}`);
  return response.data;
};
