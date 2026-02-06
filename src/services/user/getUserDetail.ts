import { customAxios } from "@/lib/axios";
import { ICenterUserDetail } from "@/types/center";
import { IResponseDefault } from "@/types/default";

type CenterUserDetailResponse = {
  data: ICenterUserDetail;
} & IResponseDefault;

/**
 * 사용자 상세 조회 API
 * @param user_sn 사용자 번호
 * @param center_sn 센터 번호
 * @returns 사용자 상세 조회 응답
 */
export const getUserDetail = async ({
  user_sn,
  center_sn,
}: {
  user_sn: string;
  center_sn: number;
}) => {
  const { data } = await customAxios.get<CenterUserDetailResponse>(
    `/members/${user_sn}/centers/${center_sn}`,
  );
  return data;
};
