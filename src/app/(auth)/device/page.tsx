import React from "react";
import { DeviceMainContainer } from "@/components/Device/DeviceMainContainer";

const DeviceHome = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex gap-2 items-center">
        <div className="w-1 h-12 bg-toggleAccent rounded-full"></div>
        <h2 className="text-3xl font-semibold text-[#333] dark:text-white">
          센터 기기 관리
        </h2>
      </div>
      <DeviceMainContainer />
    </div>
  );
};

export default DeviceHome;
