import { customAxios } from "@/lib/axios";

export const getDeviceSearch = async ({ deviceId }: { deviceId: string }) => {
  const response = await customAxios.get(`/kiosks?device_id=${deviceId}`);
  return response.data;
};
