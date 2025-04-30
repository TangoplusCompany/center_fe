import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

export const deleteCenterManager = async ({ sn }: { sn: number }) => {
  const response = await customAxios.delete<IResponseDefault>(`/centers/managers/${sn}`);
  return response.data;
};
