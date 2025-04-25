import { customUnAuthAxios } from "@/lib/axios";

export const patchCenterInformation = async ({
  center_name,
  center_address,
  center_address_detail,
}: {
  center_name: string;
  center_address: string;
  center_address_detail: string;
}) => {
  const response = await customUnAuthAxios.patch(`/centers`, {
    center_name,
    center_address,
    center_address_detail,
  });
  return response.data;
};
