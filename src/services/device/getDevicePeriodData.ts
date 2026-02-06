import { customAxios } from "@/lib/axios";
import { IDeviceChartResponse } from "@/types/device";

/**
 * 기기 사용 기간 데이터 조회 API
 * @param centerSn 센터 번호
 * @returns 기기 사용 기간 데이터 조회 응답
 */
export const getDevicePeriodData = async (centerSn: number) => {
  const { data } = await customAxios.get<IDeviceChartResponse>(
    `/kiosks/centers/${centerSn}/usage`,
  );
  return data.data ?? [];
};
