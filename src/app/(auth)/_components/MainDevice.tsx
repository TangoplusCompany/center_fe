"use client";

import DeviceStatusCard from "@/components/Card/DeviceStatusCard";
import SkeletonDeviceCard from "@/components/Card/SkeletonDeviceCard";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const MainDevice = ({ className }: { className?: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["deviceStatus"],
    queryFn: async () => {
      const response = await fetch("/api/device/status");
      return await response.json();
    },
  });
  if (isLoading) {
    return <SkeletonDeviceCard />;
  }
  if (!data) {
    return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;
  }
  return (
    <div className={`${className}`}>
      <DeviceStatusCard devices={data} />
    </div>
  );
};

export default MainDevice;
