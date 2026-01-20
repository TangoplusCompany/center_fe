"use client";

import { useGetDeviceStatus } from "@/hooks/api/device/useDeviceStatus";
import { useQueryParams } from "@/hooks/utils/useQueryParams";
import { IDeviceStatus } from "@/types/device";
import React from "react";
import { Skeleton } from "../ui/skeleton";

const DummyMeasureDeviceTab = () => {
  return (
    <Skeleton className="w-[256px] h-[36px]"/>
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
      <div className="w-full table table-fixed min-w-0">
        <div className="rounded-xl bg-gray-100 dark:bg-gray-800 p-1 gap-1 w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* 전체 조회 */}
          <button
            type="button"
            className={`${
              deviceSn === "0"
                ? "bg-toggleAccent dark:bg-gray-700 text-white dark:text-black shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            } px-4 py-1 text-sm font-medium rounded-xl transition-all whitespace-nowrap`}
            onClick={() => handleDeviceClick(0)}
          >
          전체 보기
          </button>

        {/* 디바이스 목록 */}
        {measureDeviceResponse.data.map((device, index) => {
          const active = deviceSn === device.device_sn.toString();

          return (
            <button
              key={device.device_name + index}
              type="button"
              className={`${
                active
                  ? "bg-toggleAccent dark:bg-gray-700 text-white dark:text-black shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              } px-4 py-1 text-sm font-medium rounded-xl transition-all whitespace-nowrap`}
              onClick={() => handleDeviceClick(device.device_sn)}
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
