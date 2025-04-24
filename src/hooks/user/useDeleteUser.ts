import { deleteUser } from "@/services/user/deleteUser";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useDeleteUser = (refetch: () => void) => {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      alert("사용자 제거에 성공했습니다.");
      refetch();
    },
    onError: (
      data: AxiosError<{
        data: unknown;
        message: string[];
        status: number;
        success: boolean;
      }>,
    ) => {
      alert(`Error: ${data.message}`);
      return;
    },
  });
};
