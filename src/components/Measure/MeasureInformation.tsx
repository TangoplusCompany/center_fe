import { IFilterMeasureInfo } from "@/types/user";
import React from "react";

const MeasureInformation = ({ data }: { data: IFilterMeasureInfo }) => {
  console.log(data.information);
  return <div className="flex-1 order-1 lg:order-2">MeasureInformation</div>;
};

export default MeasureInformation;
