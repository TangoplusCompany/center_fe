"use client";

import DeviceStatusCard from "@/components/card/DeviceStatusCard";
import SkeletonDeviceCard from "@/components/card/SkeletonDeviceCard";
import { DeviceStatusCardProps } from "@/types/device";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

const MainDeviceStatus = () => {
  const [centerDevice, setCenterDevice] = React.useState<
    DeviceStatusCardProps[]
  >([]);
  const { data } = useQuery({
    queryKey: ["deviceStatus"],
    queryFn: async () => {
      const response = await fetch("/api/device/status");
      return response.json();
    },
  });
  useEffect(() => {
    setCenterDevice(data);
  }, [data]);
  return (
    <>
      {centerDevice && centerDevice.length > 0 ? (
        <DeviceStatusCard devices={centerDevice} />
      ) : (
        <SkeletonDeviceCard />
      )}
    </>
  );
};

const MainDevice = ({ className }: { className?: string }) => {
  return (
    <div className={`${className}`}>
      <MainDeviceStatus />
    </div>
  );
};

export default MainDevice;
