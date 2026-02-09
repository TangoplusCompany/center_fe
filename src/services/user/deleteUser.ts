import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

/**
 * 사용자 삭제 API
 * @param sn 사용자 번호
 * @param center_sn 센터 번호
 * @returns 사용자 삭제 응답
 */
export const deleteUser = async ({
  sn,
  center_sn,
}: {
  sn: number;
  center_sn: number;
}) => {
  const response = await customAxios.delete<IResponseDefault>(
    `/members/${sn}/centers/${center_sn}`,
  );
  return response.data;
};
