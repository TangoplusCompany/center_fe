import { patchDeviceInfo } from "@/services/device/patchDeviceInfo";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useDeviceUpdate = () => {
  return useMutation({
    mutationFn: patchDeviceInfo,
    onSuccess: (data) => {
      // Handle successful login, e.g., redirect to dashboard
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
