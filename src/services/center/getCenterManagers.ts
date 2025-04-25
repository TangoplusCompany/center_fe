import { customUnAuthAxios } from "@/lib/axios";

export const getCenterManagers = async () => {
  const response = await customUnAuthAxios.get(
    `/centers/managers`,
  );
  return response.data;
};
