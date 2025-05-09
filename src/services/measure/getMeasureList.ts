import { customAxios } from "@/lib/axios";

// 센터 등록할 기기 찾기
export const getMeasureList = async ({
  page,
  limit,
  deviceSn,
}: {
  page: number;
  limit: number;
  deviceSn: string;
}) => {
  const { data } = await customAxios.get(`/measurement`, {
    params: {
      page,
      limit,
      device_sn: deviceSn,
    },
  });
  return data;
};
