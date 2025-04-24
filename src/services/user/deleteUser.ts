import { customAxios } from "@/lib/axios";

export const deleteUser = async ({ sn }: { sn: number }) => {
  const response = await customAxios.delete(`/members/${sn}`);
  return response.data;
};
