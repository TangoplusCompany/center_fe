import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

/**
 * 센터 관리자 삭제 API
 * @param sn 관리자 번호
 * @returns 센터 관리자 삭제 응답
 */
export const deleteCenterManager = async ({ sn }: { sn: number }) => {
  const response = await customAxios.delete<IResponseDefault>(`/centers/managers/${sn}`);
  return response.data;
};
