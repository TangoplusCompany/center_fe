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
  const { data: chartData, isLoading } = useDevicePeriodData("3m");
  if (isLoading) return <div>Loading...</div>;
  if (!chartData) return <div>No data</div>;

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-2xl">키오스크 사용자 추이</h2>
      <div className="w-full">
        <DeviceChart chartConfig={chartConfig} chartData={chartData} />
      </div>
    </div>
  );
};

export default DeviceChartContainer;
