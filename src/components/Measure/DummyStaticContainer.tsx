import React from "react";
import { Skeleton } from "../ui/skeleton";

const DummyStaticContainer = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} flex flex-col gap-4 lg:gap-5`}>
      <Skeleton className="w-full h-[600px]" />
      <div className="grid grid-cols-2 gap-5">
        <Skeleton className="w-full col-spa-1 h-[180px]" />
        <Skeleton className="w-full col-spa-1 h-[180px]" />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <Skeleton className="w-full col-spa-1 h-[180px]" />
        <Skeleton className="w-full col-spa-1 h-[180px]" />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <Skeleton className="w-full col-spa-1 h-[180px]" />
        <Skeleton className="w-full col-spa-1 h-[180px]" />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <Skeleton className="w-full col-spa-1 h-[180px]" />
        <Skeleton className="w-full col-spa-1 h-[180px]" />
      </div>
    </div>
  );
};

export default DummyStaticContainer;
