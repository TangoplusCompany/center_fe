import { postDeviceAdd } from "@/services/device/postDeviceAdd";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useDeviceAdd = (refetch: () => void) => {
  return useMutation({
    mutationFn: postDeviceAdd,
    onSuccess: () => {
      // Handle successful login, e.g., redirect to dashboard
      console.log("Device added successfully");
      refetch();
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
