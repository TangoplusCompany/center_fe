"use client";

import React, {useState} from "react";
import { IDeviceStatus, IDeviceStatusCardProps } from "@/types/device";
import { useGetDeviceStatus } from "@/hooks/api/device/useDeviceStatus"
import { Skeleton } from "../ui/skeleton";
import DeviceChartContainer from "./DeviceChartContainer";
import { useRouter } from "next/navigation";

const SkeletonDeviceStatus = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <h2 className="text-2xl col-span-2">키오스크 현황</h2>
      <Skeleton className="flex col-span-1 items-center justify-between rounded-lg h-20"></Skeleton>
      <Skeleton className="flex col-span-1 items-center justify-between rounded-lg h-20"></Skeleton>
    </div>
  );
};

const DashboardDeviceStatus = ({
  device,
}: {
  device: IDeviceStatusCardProps;
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/measure?device_sn=${device.sn}&page=1`);
  };
  return (
    <div
      key={device.sn}
      onClick={handleClick}
      className="col-span-1 items-center justify-between rounded-xl border-2 border-toggleAccent-background relative cursor-pointer hover:border-toggleAccent transition-colors"
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-start rounded-t-xl text-xl text-toggleAccent font-semibold bg-toggleAccent-background px-4 py-2 w-full">
          {device.device_name}
        </div>
        
        <div className="flex flex-col">
          <div className="px-4 py-2 ">
            <p className="text-sm text-gray-500">
              {`[ (${device.install_zipcode}) ${device.install_address_1} ${
                device.install_address_2 ?? ""
              } - ${device.install_location} ]`}
            </p>
          </div>

          {/* 일일 측정 건수 */}
          <div className="flex w-1/5 rounded-xl bg-toggleAccent-background p-2 ml-4 mb-2 justify-center">
              <div className="flex flex-col gap-2">
                <div className="text-sm text-toggleAccent">
                  일일 측정 건수
                </div>
                
                <div className="flex items-center justify-end gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/icons/ic_done.svg"
                    alt=""
                    className="w-6 h-6"
                  />
                  <span className="text-sm text-toggleAccent font-semibold">
                    00건
                  </span>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DeviceInformation = () => {
  const { data: deviceStatus, isLoading } = useGetDeviceStatus<IDeviceStatus>();

  const [isExpanded, setIsExpanded] = useState(false);
  if (!deviceStatus?.data) {
    return null; // 또는 로딩 상태 표시
  }
  const displayedDevices = isExpanded ? deviceStatus.data : deviceStatus.data.slice(0, 4);
  const hasMore = deviceStatus.data.length > 4;



  if (isLoading) return <SkeletonDeviceStatus />;
  if (!deviceStatus) return <div>No data</div>;
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-10 bg-toggleAccent rounded-full"></div>
          <h2 className="text-2xl col-span-2">기기 현황</h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {displayedDevices.map((device) => (
            <DashboardDeviceStatus key={device.sn} device={device} />
          ))}
        </div>
        
        {hasMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-2 px-4 text-sm text-toggleAccent rounded-xl hover:bg-toggleAccent-background transition-colors"
          >
            {isExpanded ? '접기' : `더보기`}
          </button>
        )}
      </div>
      <DeviceChartContainer deviceList={deviceStatus.data} />

      
      
    </>
  );
};
