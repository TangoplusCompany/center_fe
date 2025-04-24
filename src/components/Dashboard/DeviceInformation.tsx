"use client";

import React from "react";
import { IDeviceStatus, IDeviceStatusCardProps } from "@/types/device";
import { useGetDeviceStatus } from "@/hooks/device";
import { Skeleton } from "../ui/skeleton";
import DeviceChartContainer from "./DeviceChartContainer";

const SkeletonDeviceStatus = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <h2 className="text-2xl col-span-2">키오스크 현황</h2>
      <Skeleton className="flex col-span-1 items-center justify-between rounded-lg h-20"></Skeleton>
      <Skeleton className="flex col-span-1 items-center justify-between rounded-lg h-20"></Skeleton>
    </div>
  );
};

const DashboardDeviceStatus = ({
  device,
}: {
  device: IDeviceStatusCardProps;
}) => {
  return (
    <div
      key={device.sn}
      className="flex col-span-1 items-center justify-between rounded-lg p-4 border relative"
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-start gap-2">
          <h2 className="text-lg font-semibold">{device.device_name}</h2>
        </div>
        <p className="text-sm text-gray-500">
          {`주소 : (${device.install_zipcode}) ${device.install_address_1} ${
            device.install_address_2 ?? ""
          } - ${device.install_location}`}
        </p>
      </div>
    </div>
  );
};

export const DeviceInformation = () => {
  const { data: deviceStatus, isLoading } = useGetDeviceStatus<IDeviceStatus>();
  if (isLoading) return <SkeletonDeviceStatus />;
  if (!deviceStatus) return <div>No data</div>;
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <h2 className="text-2xl col-span-2">키오스크 현황</h2>
        {deviceStatus.data.map((device) => (
          <DashboardDeviceStatus key={device.sn} device={device} />
        ))}
      </div>
      <DeviceChartContainer deviceList={deviceStatus.data} />
    </>
  );
};
