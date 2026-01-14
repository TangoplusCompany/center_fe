"use client";

import { useDeviceChartConfig } from "@/hooks/device/useDeviceChartConfig";
import { IDeviceStatusCardProps } from "@/types/device";
import React from "react";
import DeviceChart from "./DeviceChart";
import { useDevicePeriodData } from "@/hooks/api/device/useDevicePeriodData";

const DeviceChartContainer = ({
  deviceList,
}: {
  deviceList: IDeviceStatusCardProps[];
}) => {
  const { chartConfig } = useDeviceChartConfig(deviceList);
  const { data: chartData, isLoading } = useDevicePeriodData();
  
  if (isLoading) return <div>Loading...</div>;
  if (!chartData) return <div>No data</div>;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-1 h-10 bg-toggleAccent rounded-full"></div>
        <h2 className="text-2xl col-span-2">키오스크 사용자 추이</h2>
      </div>
      <div className="w-full">
        <DeviceChart chartConfig={chartConfig} chartData={chartData} />
      </div>
    </div>
  );
};

export default DeviceChartContainer;
