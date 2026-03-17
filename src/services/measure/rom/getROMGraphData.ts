import { customAxios } from "@/lib/axios";

export const getROMGraphData = async ({
  user_sn,
  center_sn,
  isMyPage,

}: {
  user_sn: number;
  center_sn: number;
  isMyPage: boolean;
}) => {
  const apiPath = isMyPage 
  ? ``
  : `/members/${user_sn}/centers/${center_sn}/graph`
  const { data } = await customAxios.get(apiPath);

  return data.data;
};