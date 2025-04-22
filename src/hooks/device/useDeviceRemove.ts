import { deleteDeviceCenter } from "@/services/device/deleteDeviceCenter";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useDeviceRemove = (
  refetch: () => void,
  setOpen: (value: React.SetStateAction<boolean>) => void,
) => {
  return useMutation({
    mutationFn: deleteDeviceCenter,
    onSuccess: () => {
      console.log("Device Remove successfully");
      refetch();
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
