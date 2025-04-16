import { useAuthStore } from "@/providers/AuthProvider";
import { postLogin } from "@/services/auth/postLogin";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface ILoginResponse {
  status: number;
  success: boolean;
  message: string[];
  data: {
    admin_info: {
      sn: number;
      center_sn: number;
      admin_name: string;
      admin_email: string;
      admin_role: number;
      mobile: string;
      is_logged_in: boolean;
    };
    access_jwt: string;
    refresh_jwt: string;
  };
}

export const useLogin = () => {
  const router = useRouter();
  const { setAuthorization } = useAuthStore((state) => state);
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({ data }: ILoginResponse) => {
      // Handle successful login, e.g., redirect to dashboard
      setAuthorization({
        isLogin: true,
        adminName: data.admin_info.admin_name,
        adminEmail: data.admin_info.admin_email,
        adminRole: data.admin_info.admin_role,
        accessJwt: data.access_jwt,
      });
      document.cookie = `isLogin=true; path=/; max-age=${60 * 60 * 3}`;
      window.localStorage.setItem("kTonRfee_ersh", data.refresh_jwt);
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
