import { customUnAuthAxios } from "@/lib/axios";
import type { ICheckDeviceResponse } from "@/types/default";

/**
 * 기기 확인 API 실패 시 한국어 메시지 반환
 */
export function getCheckDeviceErrorMessage(
  status: number | undefined,
  t?: (key: string) => string,
): string {
  if (t) {
    switch (status) {
      case 400:
        return t("device_add_error_400");
      case 404:
        return t("device_search_error_404");
      case 409:
        return t("device_search_error_409");
      default:
        return t("device_add_network_error");
    }
  }
  switch (status) {
    case 400:
      return "Please check the serial number.";
    case 404:
      return "Device not found. Please check again.";
    case 409:
      return "This device is already registered. Please check again.";
    default:
      return "Failed to check device. Please try again.";
  }
}

/**
 * 기기(시리얼 넘버) 확인 API
 * 응답: data.device_sn, data.temp_token (주관리자 회원가입 이메일 OTP 요청 시 Authorization에 사용)
 */
export const getCheckDevice = async ({
  device_id,
}: {
  device_id: string;
}) => {
  const { data } = await customUnAuthAxios.get<ICheckDeviceResponse>(
    `/auth/check-device?device_id=${encodeURIComponent(device_id)}`,
  );
  return data;
};
