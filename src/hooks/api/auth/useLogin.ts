import { useAuthStore } from "@/providers/AuthProvider";
import { postLogin } from "@/services/auth/postLogin";
import { ILoginData } from "@/types/manager";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

/**
 * 로그인 Hooks
 * @returns 로그인 뮤테이션
 */
export const useLogin = () => {
  const router = useRouter();
  const { setLogin } = useAuthStore((state) => state);
  return useMutation({
    mutationFn: postLogin,
    onSuccess: (data: ILoginData) => {
      // Handle successful login, e.g., redirect to dashboard
      setLogin({
        isLogin: true,
        adminName: data.admin_info.admin_name,
        adminEmail: data.admin_info.admin_email,
        adminRole: data.admin_info.admin_role,
        adminSn: data.admin_info.sn,
        accessJwt: data.access_jwt,
      });
      document.cookie = `isLogin=true; path=/; max-age=${60 * 60 * 3}`;
      router.push("/");
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
      const error = data.response;
      if (!error) {
        alert("서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
        return;
      }
      if (error.status === 401) {
        alert("이메일 또는 비밀번호가 틀렸습니다.");
        return;
      }
      if (error.status === 429) {
        alert(
          `로그인 시도가 너무 잦습니다. ${error.data.data.delay}초 후 다시 시도해주세요.`,
        );
        return;
      }
      if (error.status === 423) {
        alert("비밀번호가 틀려 계정이 잠겼습니다. 관리자에게 문의하세요.");
        return;
      }
      alert("로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
      return;
    },
  });
};
