"use client";

import DeviceStatusCard from "@/components/card/DeviceStatusCard";
import SkeletonDeviceCard from "@/components/card/SkeletonDeviceCard";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const MainDeviceStatus = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["deviceStatus"],
    queryFn: async () => {
      const response = await fetch("/api/device/status");
      return response.json();
    },
  });
  return (
    <>
      {isLoading ? (
        <SkeletonDeviceCard />
      ) : (
        <>
          {data.length > 0 ? (
            <DeviceStatusCard devices={data} />
          ) : (
            <p>데이터가 존재하지 않습니다.</p>
          )}
        </>
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
