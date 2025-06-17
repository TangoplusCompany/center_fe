import { customAxios } from "@/lib/axios";

/**
 * 사용자 추가 API
 * @param memberList 사용자 목록
 * @returns 사용자 추가 응답
 */
export const postAddUser = async ({ memberList }: { memberList: string[] }) => {
  const response = await customAxios.post(`/members`, {
    user_uuid: memberList,
  });
  return response.data;
};
