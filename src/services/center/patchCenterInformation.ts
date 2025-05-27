import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

export const patchCenterInformation = async ({
  center_name,
  center_address,
  center_address_detail,
}: {
  center_name: string;
  center_address: string;
  center_address_detail: string;
}) => {
  const response = await customAxios.patch<IResponseDefault>(`/centers`, {
    center_name,
    center_address,
    center_address_detail,
  });
  return response.data;
};
