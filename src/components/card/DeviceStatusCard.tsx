import React from "react";

interface DeviceStatusCardProps {
  sn: number;
  serial_number: string;
  install_location: string;
  install_address: string;
  install_address_detail: string;
  install_zipcode: string;
  device_name: string;
  reg_date: Date;
  modify_date: Date;
  upload_date: Date;
  uploaded: string;
  used: string;
  reg_status: string;
}

const DeviceStatus = ({ status }: { status: boolean }) => {
  if (status) {
    // OFF
    return (
      <div className="h-3 w-3 rounded-full bg-green-400 relative group">
        <p className=" group-hover:opacity-100 group-hover:visible invisible opacity-0 duration-300 absolute bottom-4 left-1 p-1 rounded border border-solid border-bodydark w-[105px]">
          기기 가동 상태
        </p>
      </div>
    );
  } else {
    // ON
    return (
      <div className="h-3 w-3 rounded-full bg-rose-500 relative group">
        <p className=" group-hover:opacity-100 group-hover:visible invisible opacity-0 duration-300 absolute bottom-4 left-1 p-1 rounded border border-solid border-bodydark w-[105px]">
          기기 정지 상태
        </p>
      </div>
    );
  }
};

const DeviceCard = ({ device }: { device: DeviceStatusCardProps }) => {
  return (
    <li className="col-span-4 rounded-sm border border-stroke p-4 shadow-default dark:border-strokedark sm:px-7.5">
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
  devices: DeviceStatusCardProps[];
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
