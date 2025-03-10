"use client";

import "@/css/body-skeleton.css";
import { IFilterMeasureInfo } from "@/types/user";
import SelectMeasureDate from "./SelectMeasureDate";
import SkeletonBox from "./SkeletonBox";

const SkeletonContainer = ({ data }: { data: IFilterMeasureInfo }) => {
  return (
    <div className="flex flex-1 flex-col order-2 lg:order-1 gap-3">
      <SelectMeasureDate />
      <SkeletonBox data={data} />
    </div>
  );
};

export default SkeletonContainer;
