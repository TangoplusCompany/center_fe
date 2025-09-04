import { deleteDeviceCenter } from "@/services/device/deleteDeviceCenter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

/**
 * 센터 기기 삭제 Hooks
 * @param setOpen 기기 삭제 모달 열기 함수
 * @returns 센터 기기 삭제 뮤테이션
 */
export const useDeviceRemove = (
  setOpen: (value: React.SetStateAction<boolean>) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDeviceCenter,
    onSuccess: () => {
      alert("성공적으로 기기를 해제하였습니다.");
      queryClient.invalidateQueries({ queryKey: ["deviceStatusList"] });
      setOpen(false);
    },
    onError: (
      data: AxiosError<{
        data: unknown;
        message: string[];
        status: number;
        success: boolean;
      }>,
    ) => {
      if (!data.response) {
        alert("서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
        return;
      }
      
      const { status, data: errorData } = data.response;
      
      if (status === 400) {
        alert("잘못된 요청입니다. 입력 정보를 확인해주세요.");
      } else if (status === 401) {
        alert("인증이 필요합니다. 다시 로그인해주세요.");
      } else if (status === 403) {
        alert("권한이 없습니다. 관리자에게 문의하세요.");
      } else if (status === 404) {
        alert("해제할 기기를 찾을 수 없습니다.");
      } else if (status === 409) {
        alert("기기 해제가 불가능합니다. 기기 상태를 확인해주세요.");
      } else if (status === 500) {
        alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      } else {
        alert(`기기 해제에 실패했습니다. (오류 코드: ${status})`);
      }
    },
  });
};
