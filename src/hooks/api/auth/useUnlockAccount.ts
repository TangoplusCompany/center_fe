import { useMutation } from "@tanstack/react-query";
import { postUnlockAccount } from "@/services/auth/postUnlockAccount";

export const useUnlockAccount = () => {
  return useMutation({
    mutationFn: postUnlockAccount,
  });
};