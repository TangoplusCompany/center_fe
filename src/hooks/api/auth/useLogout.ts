import { useAuthStore } from "@/providers/AuthProvider";
import { postLogout } from "@/services/auth/postLogout";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

/**
 * 로그아웃 Hooks
 * @returns 로그아웃 뮤테이션
 */
export const useLogout = () => {
  const router = useRouter();
  const { setLogout } = useAuthStore((state) => state);
  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      // Handle successful login, e.g., redirect to dashboard
      setLogout();
      document.cookie = `isLogin=false; path=/; max-age=${60 * 60 * 3}`;
      router.push("/login");
    },
    onError: (
      data: AxiosError<{
        data: {
          delay: number;
        };
        message: string[];
        status: number;
        success: boolean;
      }>,
    ) => {
      console.error(data);
      alert("로그아웃에 실패했습니다. 잠시 후 다시 시도해주세요.");
      return;
    },
  });
};
