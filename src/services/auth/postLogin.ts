import { customUnAuthAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";
import { ILoginData } from "@/types/manager";

type ILoginResponse = { data: ILoginData } & IResponseDefault;

/**
 * 로그인 API
 * @param email 이메일
 * @param password 비밀번호
 * @returns 로그인 응답
 */
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
