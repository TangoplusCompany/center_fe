import { getSearchUser } from "@/services/user/getSearchUser";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormSetError, FieldValues } from "react-hook-form";

export const useSearchUser = () => {
  return useMutation({
    mutationFn: getSearchUser,
    onSuccess: (data) => {
      console.log(data);
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
