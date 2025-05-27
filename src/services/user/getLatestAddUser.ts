import { customAxios } from "@/lib/axios";

export const getLatestAddUser = async () => {
  const response = await customAxios.get(`/members/measurement/latest`);
  return response.data;
};
