import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

/**
 * 센터 관리자 삭제 API
 * @param center_sn 센터 번호
 * @param sn 관리자 번호
 * @returns 센터 관리자 삭제 응답
 */
export const deleteCenterManager = async ({
  center_sn,
  sn,
}: {
  center_sn: number;
  sn: number;
}) => {
  const response = await customAxios.delete<IResponseDefault>(
    `/centers/${center_sn}/managers/${sn}`,
  );
  return response.data;
};
