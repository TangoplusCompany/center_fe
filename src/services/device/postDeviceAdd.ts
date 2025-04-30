import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

export const postDeviceAdd = async ({ deviceSn }: { deviceSn: number }) => {
  const response = await customAxios.post<IResponseDefault>(
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
