import { customUnAuthAxios } from "@/lib/axios";

export const getCenterManagers = async ({
  sn,
  role,
}: {
  sn: string;
  role: number;
}) => {
  const response = await customUnAuthAxios.patch(
    `/centers/managers/${sn}/roles`,
    {
      role,
    },
  );
  return response.data;
};
