import { useMutation } from "@tanstack/react-query";
import { postResetPwd } from "@/services/auth/postResetPwd";

export const useResetPwd = () => {
  return useMutation({
    mutationFn: postResetPwd,
  });
};