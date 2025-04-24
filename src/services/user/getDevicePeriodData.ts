import { customAxios } from "@/lib/axios";

export const getDevicePeriodData = async ({ period }: { period: string }) => {
  const response = await customAxios.get(`/kiosks/usage`, {
    params: {
      period,
    },
  });
  return response.data;
};
