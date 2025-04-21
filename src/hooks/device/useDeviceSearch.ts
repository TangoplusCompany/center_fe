import { getDeviceSearch } from "@/services/device/getDeviceSearch";
import { IDeviceSearch } from "@/types/device";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormSetError, FieldValues } from "react-hook-form";

export const useGetDeviceSearch = (
  setError: UseFormSetError<FieldValues>,
  getDeviceInfo: (data: IDeviceSearch | null) => void,
) => {
  return useMutation({
    mutationFn: getDeviceSearch,
    onSuccess: (data: IDeviceSearch) => {
      // Handle successful login, e.g., redirect to dashboard
      getDeviceInfo(data);
    },
    onError: (
      data: AxiosError<{
        data: IDeviceSearch;
        message: string[];
        status: number;
        success: boolean;
      }>,
    ) => {
      getDeviceInfo(null);
      if (data.status === 404) {
        setError("serial_number", {
          type: "custom",
          message: "존재하지 않는 기기 입니다. 다시 확인바랍니다.",
        });
      }
      if (data.status === 409) {
        setError("serial_number", {
          type: "custom",
          message: "이미 등록된 기기입니다. 다시 확인바랍니다.",
        });
      }

      return;
    },
  });
};
