import { patchDeviceInfo } from "@/services/device/patchDeviceInfo";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

/**
 * 센터 기기 정보 수정 Hooks
 * @returns 센터 기기 정보 수정 뮤테이션
 */
export const useDeviceUpdate = () => {
  return useMutation({
    mutationFn: patchDeviceInfo,
    onSuccess: () => {
      alert("기기 정보가 수정되었습니다.");
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
