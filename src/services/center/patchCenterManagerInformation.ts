import { customAxios } from "@/lib/axios";

export const patchCenterManagerInformation = async ({
  sn,
  admin_name,
  mobile,
}: {
  sn: string;
  admin_name: string;
  mobile: string;
}) => {
  const response = await customAxios.patch(`/centers/update/${sn}`, {
    admin_name,
    mobile,
  });
  return response.data;
};
