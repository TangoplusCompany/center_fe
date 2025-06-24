import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

/**
 * 사용자 삭제 API
 * @param sn 사용자 번호
 * @returns 사용자 삭제 응답
 */
export const deleteUser = async ({ sn }: { sn: number }) => {
  const response = await customAxios.delete<IResponseDefault>(`/members/${sn}`);
  return response.data;
};
