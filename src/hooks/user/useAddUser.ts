import { postAddUser } from "@/services/user/postAddUser";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

/**
 * 사용자 추가 Hooks
 * @returns 사용자 추가 뮤테이션
 */
export const useAddUser = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: postAddUser,
    onSuccess: (data) => {
      console.log(data);
      alert("사용자 추가에 성공했습니다.");
      router.push("/user");
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
