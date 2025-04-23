import { customAxios } from "@/lib/axios";

export const postAddUser = async ({ memberList }: { memberList: string[] }) => {
  const response = await customAxios.post(`/members`, {
    user_uuid: memberList,
  });
  return response.data;
};
