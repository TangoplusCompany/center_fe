import { customAuthAxios } from "@/lib/axios";

export const postLogin = async ({ email, password }: { email: string; password: string }) => {
  const response = await customAuthAxios.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};
