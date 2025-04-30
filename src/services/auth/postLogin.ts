import { customUnAuthAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";
import { ILoginData } from "@/types/manager";

type ILoginResponse = { data: ILoginData } & IResponseDefault;

export const postLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data } = await customUnAuthAxios.post<ILoginResponse>(
    "/auth/login",
    {
      email,
      password,
    },
    {
      withCredentials: true,
    },
  );
  return data.data;
};
