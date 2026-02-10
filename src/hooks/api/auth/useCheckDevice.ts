import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  getCheckDevice,
  getCheckDeviceErrorMessage,
} from "@/services/auth/getCheckDevice";
import type { ICheckDeviceResponse } from "@/types/default";

export type OnCenterCheckFn = (
  deviceId: string,
  tempToken: string,
  deviceSn: number
) => void;

type Props = {
  onCenterCheck: OnCenterCheckFn;
  deviceId: string;
};

/**
 * 기기(시리얼 넘버) 확인 후 다음 단계로 진행
 * 응답의 temp_token, device_sn을 onCenterCheck로 전달
 */
export const useCheckDevice = ({ onCenterCheck, deviceId }: Props) => {
  return useMutation({
    mutationFn: getCheckDevice,
    onSuccess: (res: ICheckDeviceResponse) => {
      const { temp_token, device_sn } = res.data ?? {};
      if (temp_token != null && device_sn != null) {
        onCenterCheck(deviceId, temp_token, device_sn);
      }
    },
    onError: (error: AxiosError<{ message?: string[] }>) => {
      alert(getCheckDeviceErrorMessage(error.response?.status));
    },
  });
};
