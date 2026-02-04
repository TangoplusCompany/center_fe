import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ManagerDummyList = ({ limit }: { limit: number }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
      {Array.from({ length: Math.min(limit, 6) }).map((_, index) => (
        <Skeleton key={index} className="h-[176px] w-full rounded-xl" />
      ))}
    </div>
  );
};

export default ManagerDummyList;
