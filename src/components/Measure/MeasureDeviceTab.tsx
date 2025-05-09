"use client";

import { Button } from "@/components/ui/button";
import { useGetDeviceStatus } from "@/hooks/device";
import { useQueryParams } from "@/hooks/utils/useQueryParams";
import { IDeviceStatus } from "@/types/device";
import React from "react";

const MeasureDeviceTab = () => {
  const { query, setQueryParam } = useQueryParams();
  const deviceSn = query.device_sn || 0;
  const {
    data: measureDeviceResponse,
    isLoading,
    isError,
  } = useGetDeviceStatus<IDeviceStatus>();

  const handleDeviceClick = (deviceSn: number) => {
    setQueryParam([
      ["device_sn", deviceSn],
      ["page", "1"],
    ]);
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (!measureDeviceResponse) return <div>No data</div>;
  return (
    <div className="flex items-center justify-start gap-3">
      {measureDeviceResponse.data.map((device, index) => {
        return (
          <Button
            key={device.device_name + index}
            className="cursor-pointer"
            variant={deviceSn === device.sn.toString() ? "default" : "outline"}
            onClick={() => handleDeviceClick(device.sn)}
          >
            {device.device_name}
          </Button>
        );
      })}
    </div>
  );
};

export default MeasureDeviceTab;
