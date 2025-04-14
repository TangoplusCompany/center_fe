import { IDeviceStatusCardProps } from "@/types/device";

import React from "react";
import Link from "next/link";
import { PencilLine } from "lucide-react";
import { formatDate } from "@/utils/formatDate";

const DeviceStatus = ({ status }: { status: boolean }) => {
  return (
    <div
      className={
        `${status ? "bg-rose-500" : "bg-green-400"}` +
        " h-3 w-3 rounded-full group absolute top-4 right-4 translate-y-1/2"
      }
    ></div>
  );
};

export const DeviceStatusItems = React.memo(
  ({ device }: { device: IDeviceStatusCardProps }) => {
    return (
      <div
        key={device.sn}
        className="flex col-span-1 items-center justify-between rounded-lg bg-white p-4 border relative"
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-start gap-2">
            <h2 className="text-lg font-semibold">{device.device_name}</h2>
            <Link
              href={`/device/${device.sn}`}
              className="flex items-center gap-0.5 text-sm text-gray-500"
            >
              <PencilLine className="w-4 h-4" />
              <span>수정하기</span>
            </Link>
          </div>
          <DeviceStatus status={parseInt(device.used) > 0 ? false : true} />
          <p className="text-sm text-gray-500">
            {`주소 : (${device.install_zipcode}) ${device.install_address} ${
              device.install_address_detail ?? ""
            } - ${device.install_location}`}
          </p>
          <p className="text-sm text-gray-500">{`시리얼 넘버 : ${device.serial_number}`}</p>
          <p className="text-sm text-gray-500">{`설치일 : ${formatDate(
            device.reg_date.toString(),
          )}`}</p>
        </div>
      </div>
    );
  },
);
