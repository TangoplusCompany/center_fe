import { useMutation } from "@tanstack/react-query";
import {
  patchUserPinPassword,
  IPatchUserPinPasswordParams,
} from "@/services/user/patchUserPinPassword";

/**
 * 사용자 PIN 비밀번호 변경 Mutation Hook
 */
export const usePatchUserPinPassword = () => {
  return useMutation({
    mutationFn: (params: IPatchUserPinPasswordParams) =>
      patchUserPinPassword(params),
  });
};

