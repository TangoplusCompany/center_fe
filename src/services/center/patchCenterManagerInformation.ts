import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

export const patchCenterManagerInformation = async ({
  sn,
  admin_name,
  mobile,
}: {
  sn: number;
  admin_name: string;
  mobile: string;
}) => {
  const response = await customAxios.patch<IResponseDefault>(
    `/auth/update/${sn}`,
    {
      admin_name,
      mobile,
    },
  );
  return response.data;
};
