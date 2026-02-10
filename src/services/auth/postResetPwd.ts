import { customUnAuthAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";
import { IResetPwdProps } from "@/types/admin";

export const postResetPwd = async ({
  email_or_mobile,
  type,
  purpose,
  jwt, // otp_jwt from /otp/verify-otp response
  new_password,
}: IResetPwdProps) => {
  if (!jwt || typeof jwt !== "string") {
    throw new Error("비밀번호 변경을 위해 OTP 인증이 필요합니다. 이메일 인증 단계부터 다시 진행해주세요.");
  }
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
