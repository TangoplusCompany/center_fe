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
    <div className="w-full flex items-center justify-between">
      <div className="inline-flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1 gap-1">
        {/* 전체 조회 */}
        <button
          type="button"
          className={`${
            deviceSn === "0"
              ? "bg-toggleAccent dark:bg-gray-700 text-toggleAccent-foreground dark:text-black shadow-sm"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          } px-4 py-1 text-sm font-medium rounded-xl transition-all`}
          onClick={() => handleDeviceClick(0)}
        >
          전체 보기
        </button>

        {/* 디바이스 목록 */}
        {measureDeviceResponse.data.map((device, index) => {
          const active = deviceSn === device.sn.toString();

          return (
            <button
              key={device.device_name + index}
              type="button"
              className={`${
                active
                  ? "bg-toggleAccent dark:bg-gray-700 text-toggleAccent-foreground dark:text-black shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              } px-4 py-1 text-sm font-medium rounded-xl transition-all`}
              onClick={() => handleDeviceClick(device.sn)}
            >
              {device.device_name}
            </button>
          );
        })}
      </div>
    </div>
  );

};

export default MeasureDeviceTab;
