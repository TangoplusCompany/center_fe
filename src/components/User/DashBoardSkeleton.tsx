"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CenterUserDashBoardSkeleton = () => {
  return (
    <div className="w-full px-2 sm:px-4 md:px-0">
      <div className="flex flex-col w-full gap-2 sm:gap-3 md:gap-4">
        {/* Worst + Best 스켈레톤 */}
        <div className="flex flex-col lg:flex-row w-full gap-2 sm:gap-3 md:gap-4">
          {/* Worst 카드 */}
          <div className="w-full lg:flex-1 min-w-0">
            <div className="flex flex-col h-full w-full rounded-3xl border-2 border-sub200 dark:border-border bg-white dark:bg-muted relative overflow-hidden">
              <div className="flex flex-shrink-0 items-center gap-2 mb-4 p-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/icons/ic_arrow_315_circle.svg`}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <h2 className="text-xl font-bold text-black dark:text-foreground">가장 취약 부위</h2>
              </div>
              <div className="flex flex-col justify-end flex-1 space-y-3 p-5 mb-6 relative mr-48">
                <Skeleton className="h-8 w-20 rounded-xl" />
                <Skeleton className="h-24 w-full rounded-lg" />
              </div>
              <div className="absolute bottom-0 right-0 w-48 h-full bg-gray-200 dark:bg-zinc-800" />
            </div>
          </div>
          {/* Best 카드 */}
          <div className="w-full lg:flex-1 min-w-0">
            <div className="flex flex-col h-full w-full rounded-3xl border-2 border-sub200 dark:border-border bg-white dark:bg-muted relative overflow-hidden">
              <div className="flex flex-shrink-0 items-center gap-2 mb-4 p-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/icons/ic_arrow_45_circle.svg`}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <h2 className="text-xl font-bold text-black dark:text-foreground">유지 추천 부위</h2>
              </div>
              <div className="flex flex-col justify-end flex-1 space-y-3 p-5 mb-6 relative mr-48">
                <Skeleton className="h-8 w-20 rounded-xl" />
                <Skeleton className="h-24 w-full rounded-lg" />
              </div>
              <div className="absolute bottom-0 right-0 w-48 h-full bg-gray-200 dark:bg-zinc-800" />
            </div>
          </div>
        </div>

        {/* Measure Report Container 스켈레톤 */}
        <div className="w-full min-w-0">
          <div className="flex flex-col gap-6">
            {/* 상지 결과 */}
            <div className="rounded-3xl border-2 border-sub200 dark:border-border p-3 sm:p-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-semibold text-black dark:text-foreground">상지 결과</h3>
                  <Skeleton className="h-32 w-full rounded-lg" />
                </div>
                <Skeleton className="h-32 w-full rounded-lg" />
              </div>
            </div>
            {/* 하지 결과 */}
            <div className="rounded-3xl border-2 border-sub200 dark:border-border p-3 sm:p-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-semibold text-black dark:text-foreground">하지 결과</h3>
                  <Skeleton className="h-32 w-full rounded-lg" />
                </div>
                <Skeleton className="h-32 w-full rounded-lg" />
              </div>
            </div>
            {/* 정적 족압 결과 */}
            <div className="flex flex-col h-full gap-6 sm:gap-8 rounded-3xl border-2 border-sub200 dark:border-border p-3 sm:p-4">
              <h3 className="text-xl font-semibold text-black dark:text-foreground">정적 족압 결과</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                <Skeleton className="h-64 w-full rounded-lg" />
                <Skeleton className="h-64 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Heat Map 스켈레톤 */}
        <div className="w-full min-w-0 overflow-x-auto">
          <div className="w-full rounded-3xl border-2 border-sub200 dark:border-border p-5 shadow-none">
            <h2 className="text-xl font-bold text-black dark:text-foreground mb-4">측정 한눈에 보기</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-4">
                <h3 className="text-xl font-semibold text-black dark:text-foreground mb-4">각 측정 부위 결과</h3>
                <Skeleton className="h-64 w-full rounded-lg" />
              </div>
              <div className="p-4">
                <Skeleton className="h-64 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterUserDashBoardSkeleton;
