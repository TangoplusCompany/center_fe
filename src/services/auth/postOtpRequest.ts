import { customUnAuthAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";
import { IOtpProps } from "@/types/admin";

/**
 * @description 이메일 혹은 전화번호를 이용한 OTP 요청
 * @param {IOtpProps} email_or_mobile 이메일 혹은 전화번호
 * @param {Type} type 이메일 혹은 전화번호
 * @param {Purpose} purpose 계정 혹은 비밀번호
 * @returns {Promise<IResponseDefault>}
 */
export const postOtpRequest = async ({
  email_or_mobile,
  type,
  purpose,
}: IOtpProps) => {
  const { data } = await customUnAuthAxios.post<IResponseDefault>(
    "/otp/request-otp",
    {
      email_or_mobile,
      type,
      purpose,
    },
  );
  return data;
};
