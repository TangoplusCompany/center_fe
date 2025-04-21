import { customAxios } from "@/lib/axios";

export const postDeviceAdd = async ({ deviceSn }: { deviceSn: number }) => {
  const response = await customAxios.post(
    `/kiosks`,
    {
      device_sn: deviceSn,
    },
    {
      withCredentials: true,
    },
  );
  return response.data;
};
