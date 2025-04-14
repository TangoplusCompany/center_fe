import customAxios from "@/lib/axios";
import { IDeviceStatusCardProps } from "@/types/device";
import { useQuery } from "@tanstack/react-query";

export const useDeviceUpdate = ({
  device,
}: {
  device: IDeviceStatusCardProps;
}) => {
  return useQuery({
    queryKey: ["deviceUpdate"],
    queryFn: async () => {
      const result = await customAxios.put(`/api/device/${device.sn}`);
      return result;
    },
  });
};
