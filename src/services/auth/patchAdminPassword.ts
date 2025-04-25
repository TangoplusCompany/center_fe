import { customUnAuthAxios } from "@/lib/axios";

export const patchCenterInformation = async ({
  sn,
  current_password,
  new_password,
}: {
  sn: string;
  current_password: string;
  new_password: string;
}) => {
  const response = await customUnAuthAxios.patch(
    `/auth/updated/${sn}/passwords`,
    {
      current_password,
      new_password,
    },
  );
  return response.data;
};
