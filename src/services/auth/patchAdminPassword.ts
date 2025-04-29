import { customAxios } from "@/lib/axios";

export const patchAdminPassword = async ({
  sn,
  current_password,
  new_password,
}: {
  sn: number;
  current_password: string;
  new_password: string;
}) => {
  const response = await customAxios.patch(`/auth/update/${sn}/passwords`, {
    current_password,
    new_password,
  });
  return response.data;
};
