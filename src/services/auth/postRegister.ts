import { customUnAuthAxios } from "@/lib/axios";

export const postRegister = async ({
  email,
  mobile,
  password,
  name,
}: {
  email: string;
  mobile: string;
  password: string;
  name: string;
}) => {
  const response = await customUnAuthAxios.post("/auth/register", {
    email,
    password,
    mobile,
    name,
  });
  return response.data;
};
