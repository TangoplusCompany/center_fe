import { customUnAuthAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";
import { IOtpVerifyProps } from "@/types/admin";

type IOtpVerifyResponse = {
  data: string[];
} & IResponseDefault;

export const postOtpVerify = async ({
  email_or_mobile,
  type,
  purpose,
  otp,
}: IOtpVerifyProps) => {
  const { data } = await customUnAuthAxios.post<IOtpVerifyResponse>(
    "/otp/verify-otp",
    {
      email_or_mobile,
      type,
      purpose,
      otp,
    },
  );
  return data;
};