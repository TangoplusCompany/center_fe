import { customUnAuthAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

export const getCenterCheck = async ({ center_id }: { center_id: string }) => {
  const response = await customUnAuthAxios.get<IResponseDefault>(
    `/auth/center?center_id=${center_id}`,
  );
  return response.data;
};
