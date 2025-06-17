import { customAxios } from "@/lib/axios";

/**
 * 기기 상태 조회 API
 * @returns 기기 상태 조회 응답
 */
export const getDeviceStatus = async () => {
  const { data } = await customAxios.get("/kiosks");
  return data;
};
