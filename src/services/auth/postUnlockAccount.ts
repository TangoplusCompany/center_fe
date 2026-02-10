import { customUnAuthAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";
import { IUnlockAccountProps } from "@/types/admin";

export const postUnlockAccount = async ({
  email_or_mobile,
  type,
  purpose,
  otp,
}: IUnlockAccountProps) => {
  const { data } = await customUnAuthAxios.post<IResponseDefault>(
    "/otp/unlock-account",
    {
      email_or_mobile,
      type,
      purpose,
      ...(otp !== undefined && otp !== "" && { otp }),
    },
  );
  return data;
};