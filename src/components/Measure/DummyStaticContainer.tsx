import React from "react";
import { Skeleton } from "../ui/skeleton";

const DummyStaticContainer = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} flex flex-col gap-4`}>
      <Skeleton className="w-full h-9" />
      <Skeleton className="w-full h-[600px]" />
      <Skeleton className="w-full h-9" />
      <Skeleton className="w-full h-9" />
      <Skeleton className="w-full h-[200px]" />
      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="w-full h-9" />
        <Skeleton className="w-full h-9" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="w-full h-9" />
        <Skeleton className="w-full h-9" />
      </div>
    </div>
  );
};

export default DummyStaticContainer;
