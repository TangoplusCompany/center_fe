import { customAxios } from "@/lib/axios";

/**
 * 센터 기기 상세 조회 API
 * @param sn 기기 번호
 * @returns 센터 기기 상세 조회 응답
 */
export const getDeviceDetail = async ({ sn }: { sn: number }) => {
  const response = await customAxios.get(`/kiosks/${sn}`);
  return response.data;
};
