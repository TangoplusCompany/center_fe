import { customUnAuthAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";
import { IOtpProps } from "@/types/admin";

export const postUnlockAccount = async ({
  email_or_mobile,
  type,
  purpose,
}: IOtpProps) => {
  const { data } = await customUnAuthAxios.post<IResponseDefault>(
    "/otp/unlock-account",
    {
      email_or_mobile,
      type,
      purpose,
    },
  );
  return data;
};