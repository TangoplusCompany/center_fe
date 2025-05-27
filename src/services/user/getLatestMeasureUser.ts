import { customAxios } from "@/lib/axios";

export const getLatestMeasureUser = async () => {
  const response = await customAxios.get(`/members/measurement/latest`);
  return response.data;
};
