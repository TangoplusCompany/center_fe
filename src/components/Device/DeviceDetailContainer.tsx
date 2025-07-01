"use client";

import React from "react";
import { useDeviceUpdate } from "@/hooks/device/useDeviceUpdate";
import { useGetDeviceDetail } from "@/hooks/device/useDeviceDetail";
import { useBoolean } from "@/hooks/utils/useBoolean";
import { IDeviceDetail } from "@/types/device";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import DeviceDetailForm from "./DeviceDetailForm";
import { deviceDetailSchema, IDeviceDetailForm } from "@/schemas/deviceSchema";

export const DeviceDetailContainer = ({ sn }: { sn: number }) => {
  const { data, isLoading } = useGetDeviceDetail<IDeviceDetail>(sn);
  const { isBoolean: isEdit, setTrue, setFalse } = useBoolean(false);

  const mutationDeviceUpdate = useDeviceUpdate();

  const methods = useForm<IDeviceDetailForm>({
    resolver: zodResolver(deviceDetailSchema),
  });

  const handleEdit = () => {
    if (!isEdit) return setTrue();
    else {
      methods.reset();
      setFalse();
      return;
    }
  };

  const updateDeviceDetail = methods.handleSubmit(async (data) => {
    setFalse();
    const deviceInfo = {
      sn: sn,
      device_name: data.device_name,
      install_zipcode: "",
      install_address_1: data.install_address_1,
      install_address_2: data.install_address_2,
      install_location: data.install_location,
    };
    mutationDeviceUpdate.mutate(deviceInfo);
  });
  if (!data) return <p></p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <DeviceDetailForm
      {...methods}
      data={data}
      isEdit={isEdit}
      handleEdit={handleEdit}
      updateDeviceDetail={updateDeviceDetail}
    />
  );
};
