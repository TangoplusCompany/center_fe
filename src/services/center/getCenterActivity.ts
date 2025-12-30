import { customAxios } from "@/lib/axios";
import { ICenterActivityResponse } from "@/types/center";

export const getCenterActivity = async () => {
  const { data } = await customAxios.get<ICenterActivityResponse>(
    `/kiosks/statistics`,
  );
   return data.data ?? [];
};
