import { customUnAuthAxios } from "@/lib/axios";

export const getCenterCheck = async ({ center_id }: { center_id: string }) => {
  const response = await customUnAuthAxios.get(
    `/auth/center?center_id=${center_id}`,
  );
  return response.data;
};
