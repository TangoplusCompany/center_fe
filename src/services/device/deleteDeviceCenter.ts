import { customAxios } from "@/lib/axios";

export const deleteDeviceCenter = async (sn: number) => {
  const response = await customAxios.delete(`/kiosks/${sn}`);
  return response.data;
};
