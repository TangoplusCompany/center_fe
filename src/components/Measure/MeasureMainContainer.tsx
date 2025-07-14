"use client";

import React from "react";
import { useMeasureCount } from "@/hooks/api/measure/useMeasureCount";
import MeasureDeviceTab from "./MeasureDeviceTab";
import OptionBar from "../Util/OptionBar";
import MeasureListContainer from "./MeasureListContainer";

const MeasureMainContainer = () => {
  const { totalItems, handleTotalItems } = useMeasureCount();
  return (
    <>
      <MeasureDeviceTab />
      <OptionBar totalItems={totalItems} />
      <MeasureListContainer handleTotalItems={handleTotalItems} />
    </>
  );
};

export default MeasureMainContainer;
