import { postDeviceAdd } from "@/services/device/postDeviceAdd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useDeviceAdd = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postDeviceAdd,
    onSuccess: () => {
      // Handle successful login, e.g., redirect to dashboard
      console.log("Device added successfully");
      queryClient.invalidateQueries({ queryKey: ["deviceStatusList"] });
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
