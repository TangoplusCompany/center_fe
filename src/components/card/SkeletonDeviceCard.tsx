import React from "react";
import { Skeleton } from "../ui/skeleton";

const SkeletonDeviceCard = () => {
  return (
    <ul className="flex flex-col col-span-4 items-start justify-start gap-4">
      <li className="w-full rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-slate-900 sm:px-7.5 list-none">
        <div className="flex w-full items-center justify-between mb-1">
          <Skeleton className="w-[150px] h-[40px]" />
        </div>
        <Skeleton className="w-full h-[20px]" />
      </li>
      <li className="w-full rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-slate-900 sm:px-7.5 list-none">
        <div className="flex w-full items-center justify-between mb-1">
          <Skeleton className="w-[150px] h-[40px]" />
        </div>
        <Skeleton className="w-full h-[20px]" />
      </li>
      <li className="w-full rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-slate-900 sm:px-7.5 list-none">
        <div className="flex w-full items-center justify-between mb-1">
          <Skeleton className="w-[150px] h-[40px]" />
        </div>
        <Skeleton className="w-full h-[20px]" />
      </li>
      <li className="w-full rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-slate-900 sm:px-7.5 list-none">
        <div className="flex w-full items-center justify-between mb-1">
          <Skeleton className="w-[150px] h-[40px]" />
        </div>
        <Skeleton className="w-full h-[20px]" />
      </li>
    </ul>
  );
};

export default SkeletonDeviceCard;
