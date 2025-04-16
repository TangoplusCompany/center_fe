import { customUnAuthAxios } from "@/lib/axios";

export const postLogin = async ({ email, password }: { email: string; password: string }) => {
  const response = await customUnAuthAxios.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};
