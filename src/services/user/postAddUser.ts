import { customAxios } from "@/lib/axios";

/**
 * 사용자 추가 API
 * @param center_sn 센터 번호
 * @param memberList 사용자 목록
 * @returns 사용자 추가 응답
 */
export const postAddUser = async ({
  center_sn,
  memberList,
}: {
  center_sn: number;
  memberList: string[];
}) => {
  const response = await customAxios.post(`/members/centers/${center_sn}`, {
    user_uuid: memberList,
  });
  return response.data;
};
