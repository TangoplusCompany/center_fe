import { customAxios } from "@/lib/axios";
import { IDeviceSearch } from "@/types/device";

/**
 * 센터 등록할 기기 찾기 API
 * @param centerSn 센터 번호
 * @param deviceId 기기 ID (시리얼 번호)
 * @returns 센터 등록할 기기 찾기 응답
 */
export const getDeviceSearch = async ({
  centerSn,
  deviceId,
}: {
  centerSn: number;
  deviceId: string;
}) => {
  const response = await customAxios.get<IDeviceSearch>(
    `/kiosks/centers/${centerSn}?device_id=${encodeURIComponent(deviceId)}`,
  );
  return response.data;
};
