import { customAxios } from "@/lib/axios";

export const getDeviceStatus = async () => {
  const { data } = await customAxios.get("/kiosks");
  return data;
};
