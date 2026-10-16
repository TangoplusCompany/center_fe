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
    throw new Error("OTP verification is required to reset password. Please verify your email first.");
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
