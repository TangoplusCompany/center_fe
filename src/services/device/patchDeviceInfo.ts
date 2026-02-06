import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";
import { IDeviceInfo } from "@/types/device";

/**
 * 기기 정보 수정 API
 * @param deviceInfo 기기 정보
 * @param centerSn 센터 번호
 * @returns 기기 정보 수정 응답
 */
export const patchDeviceInfo = async (
  deviceInfo: IDeviceInfo,
  centerSn: number,
) => {
  const response = await customAxios.patch<IResponseDefault>(
    `/kiosks/${deviceInfo.sn}/centers/${centerSn}`,
    {
      device_name: deviceInfo.device_name,
      install_zipcode: deviceInfo.install_zipcode,
      install_address_1: deviceInfo.install_address_1,
      install_address_2: deviceInfo.install_address_2,
      install_location: deviceInfo.install_location,
    },
  );
  return response.data;
};
