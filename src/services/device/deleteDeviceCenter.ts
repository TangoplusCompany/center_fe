import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

/**
 * 센터 기기 삭제 API
 * @param sn 기기 번호
 * @returns 센터 기기 삭제 응답
 */
export const deleteDeviceCenter = async (sn: number) => {
  const response = await customAxios.delete<IResponseDefault>(`/kiosks/${sn}`);
  return response.data;
};
