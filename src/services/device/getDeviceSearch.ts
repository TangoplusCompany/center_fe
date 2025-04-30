import { customAxios } from "@/lib/axios";
import { IDeviceSearch } from "@/types/device";

// 센터 등록할 기기 찾기
export const getDeviceSearch = async ({ deviceId }: { deviceId: string }) => {
  const response = await customAxios.get<IDeviceSearch>(`/kiosks?device_id=${deviceId}`);
  return response.data;
};
