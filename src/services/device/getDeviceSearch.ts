import { customAxios } from "@/lib/axios";
import { IDeviceSearch } from "@/types/device";

/**
 * 센터 등록할 기기 찾기 API
 * @param deviceId 기기 ID
 * @returns 센터 등록할 기기 찾기 응답
 */
export const getDeviceSearch = async ({ deviceId }: { deviceId: string }) => {
  const response = await customAxios.get<IDeviceSearch>(`/kiosks?device_id=${deviceId}`);
  return response.data;
};
