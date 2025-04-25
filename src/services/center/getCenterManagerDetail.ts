import { customUnAuthAxios } from "@/lib/axios";

/**
 * 
 * @param sn string sn은 admin_sn입니다.
 * @returns 
 */
export const getCenterManagerDetail = async ({ sn }: { sn: string }) => {
  const response = await customUnAuthAxios.get(`/centers/managers/${sn}`);
  return response.data;
};
