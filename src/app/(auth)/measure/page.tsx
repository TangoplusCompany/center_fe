import React from "react";
import MeasureMainContainer from "./_components/MeasureMainContainer";
import MeasureDeviceTab from "@/components/Measure/MeasureDeviceTab";

const MeasurePage = () => {
  return (
    <div className="flex flex-col justify-center w-full gap-5">
      <h1 className="text-2xl col-span-12">센터 측정 관리</h1>
      <MeasureDeviceTab />
      <MeasureMainContainer />
    </div>
  );
};

export default MeasurePage;
