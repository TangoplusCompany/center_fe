import { customUnAuthAxios } from "@/lib/axios";

export const patchCenterInformation = async ({
  sn,
  admin_name,
  mobile,
}: {
  sn: string;
  admin_name: string;
  mobile: string;
}) => {
  const response = await customUnAuthAxios.patch(`/centers/update/${sn}`, {
    admin_name,
    mobile,
  });
  return response.data;
};
