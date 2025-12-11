"use client";

import "@/css/body-skeleton.css";
import { IUserDetailMeasureInfo } from "@/types/user";
import SkeletonBox from "./SkeletonBox";

const SkeletonContainer = ({ data }: { data: IUserDetailMeasureInfo }) => {
  return (
    <div className="h-full">
      <SkeletonBox data={data} />
      
    </div>
  );
};

export default SkeletonContainer;
