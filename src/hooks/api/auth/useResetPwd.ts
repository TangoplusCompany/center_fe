import { useMutation } from "@tanstack/react-query";
import { postResetPwd } from "@/services/auth/postResetPwd";
import { useRouter } from "next/navigation";

export const useResetPwd = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: postResetPwd,
    onSuccess: () => {
      alert("비밀번호가 변경되었습니다.");
      router.push("/login");
    },
    onError: () => {
      alert("비밀번호 변경에 실패했습니다.");
    },
  });
};
