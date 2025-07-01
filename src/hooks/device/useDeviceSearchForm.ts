import { deviceSearchSchema, IDeviceSearchForm } from "@/schemas/deviceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useGetDeviceSearch } from "./useDeviceSearch";
import { useState } from "react";
import { IDeviceSearch } from "@/types/device";

export const useDeviceSearchForm = () => {
  const [deviceInfo, setDeviceInfo] = useState<IDeviceSearch | null>();

  const methods = useForm<IDeviceSearchForm>({
    resolver: zodResolver(deviceSearchSchema),
  });

  const mutateDeviceSearch = useGetDeviceSearch(methods.setError, (data) =>
    setDeviceInfo(data),
  );
  const handleSubmitDeviceAdd = methods.handleSubmit(async (data) => {
    mutateDeviceSearch.mutate({
      deviceId: data.serial_number,
    });
  });
  return {
    deviceInfo,
    methods,
    handleSubmitDeviceAdd,
  };
};
