import { customAxios } from "@/lib/axios";
import { IDeviceChartResponse } from "@/types/device";

export const getDevicePeriodData = async ({ period }: { period: string }) => {
  const { data } = await customAxios.get<IDeviceChartResponse>(
    `/kiosks/usage`,
    {
      params: {
        period,
      },
    },
  );
  return data.data;
};
