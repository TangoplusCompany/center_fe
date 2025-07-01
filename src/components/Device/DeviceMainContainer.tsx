"use client";

import React from "react";
import { useGetDeviceStatus } from "@/hooks/device/useDeviceStatus";
import { IDeviceStatus } from "@/types/device";
import { DeviceStatusItems } from "@/components/Device/DeviceStatusItems";
import DeviceAddDialog from "./DeviceAddDialog";
import { useAuthStore } from "@/providers/AuthProvider";
import SkeletonDeviceCard from "@/components/Card/SkeletonDeviceCard";

export const DeviceMainContainer = () => {
  const { adminRole } = useAuthStore((state) => state);
  const { data: deviceStatus, isLoading } = useGetDeviceStatus<IDeviceStatus>();

  if (isLoading) return <SkeletonDeviceCard />;
  if (!deviceStatus) {
    return <p>잘못된 요청입니다. 잠시 후 다시 시도바랍니다.</p>;
  }
  if (!deviceStatus.data || deviceStatus.data.length === 0) {
    return (
      <div className="col-span-12 flex items-start justify-center flex-col gap-4">
        <p>센터에 등록된 기기가 존재하지 않습니다. 기기를 등록해주세요.</p>
        <div className="flex items-center justify-center">
          <DeviceAddDialog />
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-12 flex flex-col gap-4 items-end justify-center">
      <div className="grid grid-cols-2 items-start justify-center gap-3 w-full">
        {deviceStatus.data.map((device, index) => (
          <DeviceStatusItems
            key={device.serial_number + index}
            adminRole={adminRole}
            device={device}
          />
        ))}
      </div>
      <article>{adminRole < 2 && <DeviceAddDialog />}</article>
    </div>
  );
};
