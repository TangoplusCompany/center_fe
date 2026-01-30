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
      // Safari/iPhone: 쿠키·CORS 이슈로 로그아웃 API가 실패해도 클라이언트에서 로그아웃 후 로그인 페이지로 이동
      console.warn("로그아웃 API 실패(클라이언트 로그아웃 처리):", data?.response?.status, data?.message);
      setLogout();
      document.cookie = `isLogin=false; path=/; max-age=${60 * 60 * 3}`;
      // Safari에서 router.push만으로는 즉시 이탈이 안 될 수 있어, 전체 페이지 이동 사용
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      } else {
        router.push("/login");
      }
    },
  });
};
