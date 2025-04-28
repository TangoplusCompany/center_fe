"use client";

import { useDeviceChartConfig } from "@/hooks/device/useDeviceChartConfig";
import { IDeviceChartResponse, IDeviceStatusCardProps } from "@/types/device";
import React from "react";
import DeviceChart from "./DeviceChart";

import { useDevicePeriodData } from "@/hooks/device/useDevicePeriodData";
import { PERIOD_OPTIONS } from "@/utils/constants";

const DeviceChartContainer = ({
  deviceList,
}: {
  deviceList: IDeviceStatusCardProps[];
}) => {
  const { chartConfig } = useDeviceChartConfig(deviceList);
  const [period, setPeriod] = React.useState(PERIOD_OPTIONS);
  const { data: chartResponse, isLoading } =
    useDevicePeriodData<IDeviceChartResponse>(period[0].value);
  if (isLoading) return <div>Loading...</div>;
  if (!chartResponse) return <div>No data</div>;

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-2xl">키오스크 사용자 추이</h2>
      <div className="w-full">
        <DeviceChart chartConfig={chartConfig} chartData={chartResponse.data} />
      </div>
    </div>
  );
};

export default DeviceChartContainer;
