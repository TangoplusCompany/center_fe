import { customUserAxios } from "@/lib/axios";
import { ICenterUserDetail } from "@/types/center";
import { IResponseDefault } from "@/types/default";

type CenterUserDetailResponse = {
  data: ICenterUserDetail;
} & IResponseDefault;

/**
 * 사용자 상세 조회 API (Result Page용)
 * @param sn 사용자 번호
 * @returns 사용자 상세 조회 응답
 */
export const getResultUserDetail = async ({ sn }: { sn: string }) => {
  const { data } = await customUserAxios.get<CenterUserDetailResponse>(
    `/users/${sn}`,
  );
  return data;
};
