import { customAxios } from "@/lib/axios";
import { IDeviceChartResponse } from "@/types/device";

/**
 * 기기 사용 기간 데이터 조회 API
 * @param period 기간
 * @returns 기기 사용 기간 데이터 조회 응답
 */
export const getDevicePeriodData = async ({ period }: { period: string }) => {
  const { data } = await customAxios.get<IDeviceChartResponse>(
    `/kiosks/usage`,
    {
      params: {
        period,
      },
    },
  );
   return data.data ?? [];
};
