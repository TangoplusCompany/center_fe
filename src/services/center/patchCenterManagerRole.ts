import { customUnAuthAxios } from "@/lib/axios";

export const getCenterManagerRole = async ({
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
