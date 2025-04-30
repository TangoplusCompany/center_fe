import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

export const deleteDeviceCenter = async (sn: number) => {
  const response = await customAxios.delete<IResponseDefault>(`/kiosks/${sn}`);
  return response.data;
};
