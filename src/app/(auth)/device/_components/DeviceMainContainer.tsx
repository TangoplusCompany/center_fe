"use client";

import React from "react";
import { useGetDeviceStatus } from "@/hooks/device";
import SkeletonDeviceCard from "@/components/Card/SkeletonDeviceCard";
import { IDeviceStatusCardProps } from "@/types/device";
import { DeviceAnalytics, DeviceStatusItems } from "@/components/Device";

export const DeviceMainContainer = () => {
  const { data: deviceStatus, isLoading } =
    useGetDeviceStatus<IDeviceStatusCardProps[]>();

  if (isLoading) return <SkeletonDeviceCard />;
  if (!deviceStatus) return <p></p>;

  return (
    <div className="col-span-12 flex flex-col gap-4">
      <div className="grid grid-cols-2 items-start justify-center gap-3">
        {deviceStatus.map((device, index) => (
          <DeviceStatusItems
            key={device.serial_number + index}
            device={device}
          />
        ))}
      </div>
      <DeviceAnalytics />
    </div>
  );
};
