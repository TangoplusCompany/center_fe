import { customAxios } from "@/lib/axios";

export const deleteCenterManager = async ({ sn }: { sn: number }) => {
  const response = await customAxios.delete(`/centers/managers/${sn}`);
  return response.data;
};
