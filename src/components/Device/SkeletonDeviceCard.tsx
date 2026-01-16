import React from "react";
import { Skeleton } from "../ui/skeleton";

const SkeletonDeviceCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      <Skeleton className="h-[104px]"/>
      <Skeleton className="w-full h-[104px]"/>
      <Skeleton className="w-full h-[104px]"/>
      <Skeleton className="w-full h-[104px]"/>
    </div>
  );
};

export default SkeletonDeviceCard;
