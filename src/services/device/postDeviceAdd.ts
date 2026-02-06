import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

/**
 * 센터 기기 등록 API
 * @param centerSn 센터 번호
 * @param deviceSn 기기 번호
 * @returns 센터 기기 등록 응답
 */
export const postDeviceAdd = async ({
  centerSn,
  deviceSn,
}: {
  centerSn: number;
  deviceSn: number;
}) => {
  const response = await customAxios.post<IResponseDefault>(
    `/kiosks/centers/${centerSn}`,
    {
      device_sn: deviceSn,
    },
    {
      withCredentials: true,
    },
  );
  return response.data;
};
