import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";
import { IAdminCenterListItem } from "@/types/center";

type GetAdminCentersResponse = IResponseDefault & {
  data?: IAdminCenterListItem[];
};

/**
 * 관리자 소속 센터 목록 조회
 * @param adminSn admin_sn
 * @returns 센터 목록
 */
export const getAdminCenters = async (
  adminSn: number
): Promise<IAdminCenterListItem[]> => {
  const { data } = await customAxios.get<GetAdminCentersResponse>(
    `/auth/admins/${adminSn}/centers`
  );
  // data가 없거나 배열이 아닐 수 있음 (API가 success만 주고 data 생략 시 등)
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};
