"use client";

import "@/css/body-skeleton.css";
import { IFilterMeasureInfo } from "@/types/user";
import SkeletonBox from "./SkeletonBox";
import MeasureDateSelect from "./MeasureDateSelect";

const SkeletonContainer = ({ data }: { data: IFilterMeasureInfo }) => {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <MeasureDateSelect />
      <SkeletonBox data={data} />
    </div>
  );
};

export default SkeletonContainer;
