import { IDeviceStatusCardProps } from "@/types/device";

import React from "react";
import DeviceRemoveDialog from "@/components/Device/DeviceRemoveDialog";
import DeviceEditDialog from "./DeviceEditDialog";

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
        key={device.device_sn}
        className="col-span-1 items-center justify-between rounded-xl border-2 border-toggleAccent-background relative transition-colors"
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between rounded-t-xl text-xl text-toggleAccent dark:text-white font-semibold bg-toggleAccent-background px-4 py-2 w-full">
            {device.device_name}
            <div className="flex items-center gap-2">
              {adminRole < 3 && (
                <DeviceEditDialog deviceSn={device.device_sn} />
              )}
              {adminRole < 2 && <DeviceRemoveDialog deviceInfo={device} />}
            </div>
          </div>
          <div className="flex w-full min-h-32 justify-between">
            <div className="flex flex-col justify-between">
              {/* <div className="text-base px-4 py-2">Tango Body Pro</div> */}
              <div className="flex flex-col gap-1 px-4 py-2">
                <p className="text-base ">
                  {`[${device.install_location.trim()}]`}
                </p>
                <p className="text-base ">
                  {`주소: ${device.install_address_1 ?? ""} ${device.install_address_2 ?? ""}`}
                </p>
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
    );
  },
);

DeviceStatusItems.displayName = "DeviceStatusItems";
