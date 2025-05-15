import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchUserDetail } from "@/services/user/patchUserDetail";

export const usePatchUserDetail = (userSn: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchUserDetail,
    onSuccess: () => {
      console.log("success");
      alert("성공적으로 사용자의 데이터가 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["userDetail", userSn] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
