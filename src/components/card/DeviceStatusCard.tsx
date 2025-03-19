import React from "react";
import { IDeviceStatusCardProps } from "@/types/device";

const DeviceStatus = ({ status }: { status: boolean }) => {
  if (status) {
    // OFF
    return (
      <div className="h-3 w-3 rounded-full bg-green-400 relative group"></div>
    );
  } else {
    // ON
    return (
      <div className="h-3 w-3 rounded-full bg-rose-500 relative group"></div>
    );
  }
};

const DeviceCard = ({ device }: { device: IDeviceStatusCardProps }) => {
  return (
    <li className="col-span-6 lg:col-span-4 rounded-sm border border-stroke p-4 shadow-default dark:border-strokedark sm:px-7.5">
      <div className="flex w-full items-center justify-between mb-1">
        <p className="text-xl">{device.device_name}</p>
        <DeviceStatus status={parseInt(device.used) > 0 ? false : true} />
      </div>
      <p className="break-keep text-sm">
        {device.install_location} -{" "}
        {device.install_address + " " + device.install_address_detail}
      </p>
    </li>
  );
};

const DeviceStatusCard = ({
  devices,
}: {
  devices: IDeviceStatusCardProps[];
}) => {
  return (
    <ul className="grid grid-cols-12 col-span-12 items-start justify-start gap-4">
      {devices.map((device, index) => (
        <DeviceCard key={device.serial_number + index} device={device} />
      ))}
    </ul>
  );
};

export default DeviceStatusCard;
