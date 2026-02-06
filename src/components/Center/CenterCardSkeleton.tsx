import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CenterCardSkeleton = () => (
  <div className="col-span-1 rounded-xl border-2 border-toggleAccent-background dark:border-border overflow-hidden">
    <div className="flex flex-col">
      <div className="flex items-center justify-between rounded-t-xl bg-toggleAccent-background dark:bg-toggleAccent-background px-4 py-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-5 w-16 rounded-md" />
      </div>
      <div className="flex w-full items-stretch gap-4 px-4 py-3">
        <Skeleton className="h-24 w-24 shrink-0 rounded-lg" />
        <div className="flex flex-col justify-center gap-2 flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  </div>
);

export default CenterCardSkeleton;
