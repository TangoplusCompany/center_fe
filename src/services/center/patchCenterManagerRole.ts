import { customAxios } from "@/lib/axios";

export const patchCenterManagerRole = async ({
  sn,
  role,
}: {
  sn: number;
  role: number;
}) => {
  const response = await customAxios.patch(`/centers/managers/${sn}/roles`, {
    role,
  });
  return response.data;
};
