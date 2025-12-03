"use client";

import { Button } from "@/components/ui/button";
import { useGetDeviceStatus } from "@/hooks/api/device/useDeviceStatus";
import { useQueryParams } from "@/hooks/utils/useQueryParams";
import { IDeviceStatus } from "@/types/device";
import React from "react";

const DummyMeasureDeviceTab = () => {
  return (
    <div className="flex items-center justify-start gap-3">
      {Array.from({ length: 3 }).map((_, index) => {
        return (
          <Button key={index} className="cursor-pointer" variant="outline">
            <span className="block w-20"></span>
          </Button>
        );
      })}
    </div>
  );
};

const MeasureDeviceTab = () => {
  const { query, setQueryParam } = useQueryParams();
  const deviceSn = query.device_sn || "0";
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
  if (isLoading) return <DummyMeasureDeviceTab />;
  if (isError) return <div>Error...</div>;
  if (!measureDeviceResponse) return <div>No data</div>;
  return (
    <div className="flex items-center justify-start gap-3">
      <Button
        key="Default-Device-All-Select"
        className="cursor-pointer"
        variant={deviceSn === "0" ? "default" : "outline"}
        onClick={() => handleDeviceClick(0)}
      >
        전체 조회
      </Button>
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
