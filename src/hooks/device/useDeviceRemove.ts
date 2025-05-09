import { deleteDeviceCenter } from "@/services/device/deleteDeviceCenter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useDeviceRemove = (
  setOpen: (value: React.SetStateAction<boolean>) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDeviceCenter,
    onSuccess: () => {
      console.log("Device Remove successfully");
      queryClient.invalidateQueries({ queryKey: ["deviceStatusList"] });
      setOpen(false);
    },
    onError: (
      data: AxiosError<{
        data: unknown;
        message: string[];
        status: number;
        success: boolean;
      }>,
    ) => {
      alert(`Error: ${data.message}`);
      return;
    },
  });
};
