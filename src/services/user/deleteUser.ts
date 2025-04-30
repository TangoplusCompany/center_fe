import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

export const deleteUser = async ({ sn }: { sn: number }) => {
  const response = await customAxios.delete<IResponseDefault>(`/members/${sn}`);
  return response.data;
};
