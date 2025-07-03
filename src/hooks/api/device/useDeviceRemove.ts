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
      alert(`Error: ${data.message}`);
      return;
    },
  });
};
