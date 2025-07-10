import React from "react";
import { DeviceMainContainer } from "@/components/Device/DeviceMainContainer";

const DeviceHome = () => {
  return (
    <div className="grid grid-cols-12 gap-5">
      <h1 className="text-2xl col-span-12">센터 기기 관리</h1>
      <DeviceMainContainer />
    </div>
  );
};

export default DeviceHome;
