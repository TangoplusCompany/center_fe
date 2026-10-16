import { customAxios } from "@/lib/axios"
import { IResponseDefault } from "@/types/default"

export const post2FAWithDrawAccount = async () => {
  const { data } = await customAxios.post<IResponseDefault>(
    "auth/request-2fa-for-withdraw-account",
    {
      "type": "email",
      "purpose": "withdraw_account"
    }
  );
  return data;
}