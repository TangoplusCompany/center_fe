import { postDeviceAdd } from "@/services/device/postDeviceAdd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

/**
 * 센터 기기 추가 Hooks
 * @returns 기기 추가 뮤테이션
 */
export const useDeviceAdd = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postDeviceAdd,
    onSuccess: () => {
      alert("성공적으로 기기가 추가되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["deviceStatusList"] });
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
      
      const { status } = data.response;
      
      if (status === 400) {
        alert("잘못된 요청입니다. 시리얼 번호를 확인해주세요.");
      } else if (status === 403) {
        alert("권한이 없습니다. 관리자에게 문의하세요.");
      } else if (status === 404) {
        alert("등록할 기기를 찾을 수 없습니다. 시리얼 번호를 확인해주세요.");
      } else if (status === 409) {
        alert("이미 등록된 기기입니다.");
      } else if (status === 500) {
        alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      } else {
        alert(`기기 추가에 실패했습니다. (오류 코드: ${status})`);
      }
    },
  });
};
