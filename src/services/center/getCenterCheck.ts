import { customUnAuthAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

/**
 * 센터 존재 여부 확인 API
 * @param center_id 센터 ID
 * @returns 센터 존재 여부 확인 응답
 */
export const getCenterCheck = async ({ center_id }: { center_id: string }) => {
  const response = await customUnAuthAxios.get<IResponseDefault>(
    `/auth/center?center_id=${center_id}`,
  );
  return response.data;
};
