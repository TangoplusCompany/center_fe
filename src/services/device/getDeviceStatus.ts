import { customAxios } from "@/lib/axios";

/**
 * 센터 기기 상태 조회 API
 * @param centerSn 센터 번호
 * @returns 기기 상태 조회 응답
 */
export const getDeviceStatus = async (centerSn: number) => {
  const { data } = await customAxios.get(`/kiosks/centers/${centerSn}`);
  return data;
};
