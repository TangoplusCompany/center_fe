import { customUnAuthAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

type RegisterResponse = { data: { admin_sn: number } } & IResponseDefault;

export const postRegister = async ({
  center_id,
  email,
  mobile,
  password,
  name,
}: {
  center_id: string;
  email: string;
  mobile: string;
  password: string;
  name: string;
}) => {
  const response = await customUnAuthAxios.post<RegisterResponse>(
    "/auth/register",
    {
      center_id,
      email,
      password,
      mobile,
      name,
    },
  );
  return response.data;
};
