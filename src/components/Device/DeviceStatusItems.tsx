import { IDeviceStatusCardProps } from "@/types/device";

import React from "react";
import Link from "next/link";
import { PencilLine } from "lucide-react";
import DeviceRemoveDialog from "@/app/(auth)/device/_components/DeviceRemoveDialog";
import { nameFiltering } from "@/utils/regexFiltering";

export const DeviceStatusItems = React.memo(
  ({
    device,
    adminRole,
  }: {
    device: IDeviceStatusCardProps;
    adminRole: number;
  }) => {
    return (
      <div
        key={device.sn}
        className="flex col-span-1 items-center justify-between rounded-lg p-4 border relative"
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-start gap-2">
            <h2 className="text-lg font-semibold">{device.device_name}</h2>
            {adminRole < 3 && (
              <Link
                href={`/device/${device.sn}`}
                className="flex items-center gap-0.5 text-sm text-gray-500"
              >
                <PencilLine className="w-4 h-4" />
                <span>수정하기</span>
              </Link>
            )}
            {adminRole < 2 && <DeviceRemoveDialog deviceInfo={device} />}
          </div>
          <p className="text-sm text-gray-500">
            {`주소 : (${device.install_zipcode}) ${device.install_address_1} ${
              device.install_address_2 ?? ""
            } - ${device.install_location}`}
          </p>
          <p className="text-sm text-gray-500">{`시리얼 넘버 : ${nameFiltering(device.serial_number)}`}</p>
        </div>
      </div>
    );
  },
);

DeviceStatusItems.displayName = "DeviceStatusItems";
