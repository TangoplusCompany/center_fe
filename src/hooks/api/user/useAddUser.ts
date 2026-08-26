import { postAddUser } from "@/services/user/postAddUser";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/providers/AuthProvider";

/**
 * 사용자 추가 Hooks
 * @returns 사용자 추가 뮤테이션
 */
export const useAddUser = (t: (key: string)=> string) => {
  const router = useRouter();
  const centerSn = useAuthStore((state) => state.centerSn);
  return useMutation({
    mutationFn: ({ memberList }: { memberList: string[] }) =>
      postAddUser({ center_sn: centerSn, memberList }),
    onSuccess: () => {
      alert(t('hook_add_user'));
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
