import { customAxios } from "@/lib/axios";

export const patchAdminPassword = async ({
  sn,
  current_password,
  new_password,
}: {
  sn: string;
  current_password: string;
  new_password: string;
}) => {
  const response = await customAxios.patch(`/auth/updated/${sn}/passwords`, {
    current_password,
    new_password,
  });
  return response.data;
};
