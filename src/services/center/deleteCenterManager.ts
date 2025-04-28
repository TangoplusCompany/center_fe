import { customUnAuthAxios } from "@/lib/axios";

export const deleteCenterManager = async ({ sn }: { sn: number }) => {
  const response = await customUnAuthAxios.delete(`/centers/managers/${sn}`);
  return response.data;
};
