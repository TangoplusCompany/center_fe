import { customAxios } from "@/lib/axios";
import { ICenterUserDetail } from "@/types/center";
import { IResponseDefault } from "@/types/default";

type CenterUserDetailResponse = {
  data: ICenterUserDetail;
} & IResponseDefault;

/**
 * 사용자 상세 조회 API
 * @param sn 사용자 번호
 * @returns 사용자 상세 조회 응답
 */
export const getUserDetail = async ({ sn }: { sn: string }) => {
  const { data } = await customAxios.get<CenterUserDetailResponse>(
    `/members/${sn}`,
  );
  return data;
};
