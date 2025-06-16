"use client"

import React, { useState } from "react";
import MeasureMainContainer from "./_components/MeasureMainContainer";
import MeasureDeviceTab from "@/components/Measure/MeasureDeviceTab";
import OptionBar from "@/components/Util/OptionBar";

const MeasurePage = () => {
  const [totalItems, setTotalItems] = useState(0);
  const handleTotalItems = (totalItems: number) => {
    setTotalItems(totalItems);
  }
  return (
    <div className="flex flex-col justify-center w-full gap-5">
      <h1 className="text-2xl col-span-12">센터 측정 관리</h1>
      <MeasureDeviceTab />
      <OptionBar totalItems={totalItems} />
      <MeasureMainContainer handleTotalItems={handleTotalItems} />
    </div>
  );
};

export default MeasurePage;
