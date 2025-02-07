import DeviceStatusCard from "@/components/card/DeviceStatusCard";
import SkeletonDeviceCard from "@/components/card/SkeletonDeviceCard";
import { AreaChartComponent } from "@/components/chart/Area";
import { ToolTipChart } from "@/components/chart/Tooltip";
import { DeviceStatusCardProps } from "@/types/device";
import React from "react";

export default function Home() {
  const centerDevice: DeviceStatusCardProps[] = [
    {
      sn: 0,
      serial_number: "SERIALNUMBER1",
      install_location: "(주)옵토닉스",
      install_address: "광주광역시 북구 첨단벤처소로 37번길 7",
      install_address_detail: "1층(월출동)",
      install_zipcode: "36632",
      device_name: "탱고바디1",
      reg_date: new Date(),
      modify_date: new Date(),
      upload_date: new Date(),
      uploaded: "1",
      used: "0",
      reg_status: "1",
    },
    {
      sn: 1,
      serial_number: "SERIALNUMBER2",
      install_location: "(주)옵토닉스",
      install_address: "광주광역시 북구 첨단벤처소로 37번길 7",
      install_address_detail: "1층(월출동)",
      install_zipcode: "36632",
      device_name: "탱고바디2",
      reg_date: new Date(),
      modify_date: new Date(),
      upload_date: new Date(),
      uploaded: "1",
      used: "1",
      reg_status: "1",
    },
  ];
  return (
    <div className="grid grid-cols-12 gap-4">
      {centerDevice && centerDevice.length > 0 ? (
        <DeviceStatusCard devices={centerDevice} />
      ) : (
        <SkeletonDeviceCard />
      )}
      <AreaChartComponent className="col-span-12 shadow-none" title="타이틀" description="설명" />
      <ToolTipChart />
    </div>
  );
}
