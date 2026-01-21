"use client";

import React, {useState} from "react";
import { IDeviceStatus, IDeviceStatusCardProps } from "@/types/device";
import { useGetDeviceStatus } from "@/hooks/api/device/useDeviceStatus"
import { Skeleton } from "../ui/skeleton";
import DeviceChartContainer from "./DeviceChartContainer";
import { useRouter } from "next/navigation";

const DashboardDeviceStatus = ({
  device,
}: {
  device: IDeviceStatusCardProps;
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/measure?device_sn=${device.device_sn}&page=1`);
  };
  return (
    <div
      key={device.device_sn}
      onClick={handleClick}
      className="col-span-1 items-center justify-between rounded-xl border-2 border-toggleAccent-background relative cursor-pointer hover:border-toggleAccent transition-colors"
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-start rounded-t-xl text-xl text-toggleAccent font-semibold bg-toggleAccent-background px-4 py-2 w-full">
          {device.device_name}
        </div>
        
        <div className="flex w-full min-h-32 justify-between">

          <div className="flex flex-col">
            <div className="flex flex-col justify-between">
              <div className="text-base px-4 py-2">
                Tango Body Pro
              </div>
              <div className="flex flex-col gap-1 px-4 py-2">
                <p className="text-base ">
                  {`[${device.install_location.trim()}]`}
                </p>
                <p className="text-base ">
                  {`주소: ${device.install_address_1 ?? ""} ${device.install_address_2 ?? ""}`}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-end">
            <div className="flex rounded-xl bg-toggleAccent-background p-2 m-2 w-fit h-fit">
              <div className="flex flex-col gap-2">
                <div className="text-sm text-toggleAccent whitespace-nowrap">
                  일일 측정 건수
                </div>
                
                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm text-toggleAccent font-semibold">
                    {device.trend === 0 ? '▼ ' : (device.trend === 1 ? '- ' : '▲ ')}
                    {device.today_count} 건
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 overflow-hidden w-32 h-32">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/img_tangobody_pro.svg" 
                alt="tangobody_pro_img" 
                className="scale-250 object-cover object-top w-full h-full" 
              />
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
  if (isLoading) return (
    <div className="flex flex-col gap-4">
      <Skeleton className="w-full h-[320px]" />
      <Skeleton className="w-full h-[320px]" />
    </div>
  );
  if (!deviceStatus) return <div>No data</div>;
  if (!deviceStatus?.data) {
    return null; 
  }
  const displayedDevices = isExpanded ? deviceStatus.data : deviceStatus.data.slice(0, 4);
  const hasMore = deviceStatus.data.length > 4;
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-10 bg-toggleAccent rounded-full"></div>
          <h2 className="text-2xl col-span-2">기기 현황</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {displayedDevices.map((device) => (
            <DashboardDeviceStatus key={device.device_sn} device={device} />
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
