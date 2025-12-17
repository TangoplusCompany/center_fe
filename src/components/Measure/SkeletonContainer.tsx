"use client";

import "@/css/body-skeleton.css";
import { IUserDetailMeasureInfo } from "@/types/measure";
import SkeletonBox from "./SkeletonBox";

const SkeletonContainer = ({ data }: { data: IUserDetailMeasureInfo }) => {
  return (
    <div className="h-full">
      <SkeletonBox data={data} />
      
    </div>
  );
};

export default SkeletonContainer;
