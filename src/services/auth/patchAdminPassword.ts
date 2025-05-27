import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

export const patchAdminPassword = async ({
  sn,
  current_password,
  new_password,
}: {
  sn: number;
  current_password: string;
  new_password: string;
}) => {
  const response = await customAxios.patch<IResponseDefault>(`/auth/update/${sn}/passwords`, {
    current_password,
    new_password,
  });
  return response.data;
};
