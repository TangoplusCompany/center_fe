import React from "react";
import { DeviceMainContainer } from "@/components/Device/DeviceMainContainer";

const DeviceHome = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <h1 className="text-2xl col-span-12">센터 기기 관리</h1>
      <DeviceMainContainer />
    </div>
  );
};

export default DeviceHome;
