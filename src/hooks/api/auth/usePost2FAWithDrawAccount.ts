import { post2FAWithDrawAccount } from "@/services/auth/post2FAWithDrawAccount";
import { IResponseDefault } from "@/types/default";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios"; // 👈 추가

export const usePost2FAWithDrawAccount = (
  // Error -> AxiosError로 변경
  options?: UseMutationOptions<IResponseDefault, AxiosError, void>
) => {
  return useMutation({
    mutationFn: post2FAWithDrawAccount,
    ...options,
  });
};