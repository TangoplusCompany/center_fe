import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

export const patchCenterManagerRole = async ({
  sn,
  role,
}: {
  sn: number;
  role: number;
}) => {
  const response = await customAxios.patch<IResponseDefault>(`/centers/managers/${sn}/roles`, {
    role,
  });
  return response.data;
};
