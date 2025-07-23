import { customUnAuthAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";
import { IOtpProps } from "@/types/admin";

export const postResetPwd = async ({
  email_or_mobile,
  type,
  purpose,
}: IOtpProps) => {
  const { data } = await customUnAuthAxios.post<IResponseDefault>(
    "/otp/reset-pwd",
    {
      email_or_mobile,
      type,
      purpose,
    },
  );
};
