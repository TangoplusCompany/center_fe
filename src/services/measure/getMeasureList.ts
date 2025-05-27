import { customAxios } from "@/lib/axios";

// 센터 측정리스트
export const getMeasureList = async ({
  page,
  limit,
  deviceSn,
  search,
}: {
  page?: number;
  limit?: number;
  deviceSn?: string;
  search?: string;
}) => {
  const params: Record<string, string | number> = {
    page: page || 1,
    limit: limit || 20,
  };
  if (search?.trim() && search !== "") {
    params.search = search;
  }
  if (deviceSn?.trim() && deviceSn !== "") {
    params.device_sn = deviceSn;
  }
  const { data } = await customAxios.get(`/measurement`, {
    params,
  });
  return data;
};
