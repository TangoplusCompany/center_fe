"use client";

import DeviceStatusCard from "@/components/Card/DeviceStatusCard";
import SkeletonDeviceCard from "@/components/Card/SkeletonDeviceCard";
import { Separator } from "@/components/ui/separator";
import { useGetDeviceStatus } from "@/hooks/device";
import { IDeviceStatusCardProps } from "@/types/device";
import React from "react";

const MainDevice = ({ className }: { className?: string }) => {
  const { data, isLoading, error } =
    useGetDeviceStatus<IDeviceStatusCardProps[]>();

  if (isLoading) {
    return <SkeletonDeviceCard />;
  }
  if (!data) {
    return (
      <p className="col-span-12">
        센터에 등록된 기기가 존재하지 않습니다. 기기를 등록해주세요.
      </p>
    );
  }

  return (
    <div className={`${className}`}>
      <DeviceStatusCard devices={data} />
      <Separator className="my-4 col-span-12" />
    </div>
  );
};

export default MainDevice;
