"use client";

import "@/css/body-skeleton.css";
import { IUserDetailMeasureInfo } from "@/types/user";
import SkeletonBox from "./SkeletonBox";

const SkeletonContainer = ({ data }: { data: IUserDetailMeasureInfo }) => {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <SkeletonBox data={data} />
    </div>
  );
};

export default SkeletonContainer;
