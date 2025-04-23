import { getUnregisterUser } from "@/services/user/getUnregisterUser";
import { IUnregisterUserResponse } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useSearchUnregisterUser = () => {
  return useMutation({
    mutationFn: getUnregisterUser,
    onSuccess: (data: IUnregisterUserResponse) => {
      return data;
      // Handle successful login, e.g., redirect to dashboard
    },
    onError: (
      data: AxiosError<{
        data: unknown;
        message: string[];
        status: number;
        success: boolean;
      }>,
    ) => {
      console.log(data);
      return;
    },
  });
};
