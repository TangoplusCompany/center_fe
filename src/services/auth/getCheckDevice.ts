import { customUnAuthAxios } from "@/lib/axios";
import type { ICheckDeviceResponse } from "@/types/default";

/**
 * 기기 확인 API 실패 시 한국어 메시지 반환
 */
export function getCheckDeviceErrorMessage(
  status: number | undefined,
): string {
  switch (status) {
    case 400:
      return "시리얼 넘버를 입력해주세요.";
    case 404:
      return "해당 시리얼 넘버의 기기가 존재하지 않습니다. 다시 확인해주세요.";
    case 409:
      return "해당 시리얼 넘버의 기기가 이미 사용 중입니다.";
    default:
      return "기기 확인에 실패했습니다. 다시 시도해주세요.";
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
