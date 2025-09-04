import { customUnAuthAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";
import { IResetPwdProps } from "@/types/admin";

export const postResetPwd = async ({
  email_or_mobile,
  type,
  purpose,
  jwt,
  new_password,
}: IResetPwdProps) => {
  const { data } = await customUnAuthAxios.post<IResponseDefault>(
    "/otp/reset-pwd",
    {
      email_or_mobile,
      type,
      purpose,
      new_password,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  );
  return data;
};
