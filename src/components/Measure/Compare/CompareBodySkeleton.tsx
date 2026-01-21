"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const CompareBodySkeleton = () => {
  const measureTabs = [
    { title: "결과 요약", value: "summary" },
    { title: "정면 측정", value: "first" },
    { title: "팔꿉 측정", value: "second" },
    { title: "좌측 측정", value: "third" },
    { title: "우측 측정", value: "fourth" },
    { title: "후면 측정", value: "fifth" },
    { title: "앉은 후면", value: "sixth" },
    { title: "오버헤드 스쿼트", value: "squart" },
  ];

  return (
    <div className="w-full flex flex-col gap-4 min-w-0 max-w-full">
      {/* ✅ 상단 탭 영역 - 제목은 실제로 표시 */}
      <Tabs defaultValue="summary" className="w-full table table-fixed min-w-0">
        <div className="w-full">
          <div className="overflow-x-auto overflow-y-hidden w-full min-w-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <TabsList className="relative z-10 flex w-max min-w-full flex-nowrap items-center justify-start bg-transparent p-0 border-none shadow-none">
              {measureTabs.map((measure) => (
                <TabsTrigger
                  key={measure.value}
                  value={measure.value}
                  className={cn(
                    "relative pb-2 text-lg font-semibold transition-colors whitespace-nowrap flex-shrink-0",
                    "bg-transparent data-[state=active]:bg-transparent",
                    "shadow-none data-[state=active]:shadow-none",
                    "text-sub300 hover:text-secondary data-[state=active]:text-toggleAccent",
                    "after:absolute after:-bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-md",
                    "after:bg-sub200 data-[state=active]:after:bg-toggleAccent after:z-10"
                  )}
                >
                  {measure.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>
      </Tabs>

      {/* 날짜 카드 영역 - 스켈레톤 */}
      <div className="grid grid-cols-2 gap-4 items-stretch w-full">
        <div className="min-w-0">
          <div className="relative rounded-xl border-2 border-sub200 px-4 py-2 flex items-center justify-center my-4">
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
        <div className="min-w-0">
          <div className="relative rounded-xl border-2 border-sub200 px-4 py-2 flex items-center justify-center my-4">
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
      </div>

      {/* 하단 컨텐츠 영역 - 스켈레톤 */}
      <div className="w-full overflow-hidden">
        {/* 결과 요약 탭의 내용 (CompareIntro 구조) */}
        <div className="flex flex-col gap-4">
          {/* Skeleton Boxes (2개) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative box-border flex h-full flex-col items-center rounded-3xl border-2 border-sub200 p-4">
              <Skeleton className="h-96 w-full" />
            </div>
            <div className="relative box-border flex h-full flex-col items-center rounded-3xl border-2 border-sub200 p-4">
              <Skeleton className="h-96 w-full" />
            </div>
          </div>

          <div className="h-4"></div>

          <div className="flex flex-col gap-4">
            {/* 상지요약 */}
            <div className="w-full table table-fixed min-w-0 overflow-hidden">
              <div className="flex flex-col overflow-x-auto overflow-y-hidden w-full min-w-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="bg-sub100 min-w-[700px] text-xl font-semibold px-4 py-2 border-t-2 border-b-2 border-sub200">
                  상지요약
                </div>
                <div className="flex min-w-[700px]">
                  <div className="flex flex-col w-[20%] min-w-[120px] items-center justify-center gap-2 px-4 md:px-8 flex-shrink-0 bg-sub100">
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <div className="grid grid-raws-2 w-[80%] min-w-[480px]">
                    <Skeleton className="h-32 w-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* 하지요약 */}
            <div className="w-full table table-fixed min-w-0 overflow-hidden">
              <div className="flex flex-col overflow-x-auto overflow-y-hidden w-full min-w-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="bg-sub100 min-w-[700px] text-xl font-semibold px-4 py-2 border-t-2 border-b-2 border-sub200">
                  하지요약
                </div>
                <div className="flex min-w-[700px]">
                  <div className="flex flex-col w-[20%] min-w-[120px] items-center justify-center gap-2 px-4 md:px-8 flex-shrink-0 bg-sub100">
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <div className="grid grid-raws-2 w-[80%] min-w-[480px]">
                    <Skeleton className="h-32 w-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* 정면 족압 */}
            <div className="w-full table table-fixed min-w-0 overflow-hidden">
              <div className="flex flex-col overflow-x-auto overflow-y-hidden w-full min-w-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="bg-sub100 min-w-[700px] text-xl font-semibold px-4 py-2 border-t-2 border-b-2 border-sub200">
                  정면 족압
                </div>
                <div className="flex w-full min-w-[700px]">
                  <div className="flex flex-col w-[20%] items-center justify-center gap-2 px-8 flex-shrink-0 bg-sub100">
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <div className="grid grid-raws-2 w-[80%]">
                    <Skeleton className="h-40 w-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* 동적 족압 및 이동 궤적 */}
            <div className="w-full table table-fixed min-w-0 overflow-hidden">
              <div className="flex flex-col overflow-x-auto overflow-y-hidden w-full min-w-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="bg-sub100 text-xl font-semibold px-4 py-2 border-t-2 border-b-2 border-sub200">
                  동적 족압 및 이동 궤적
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col md:flex-row w-full">
                    <div className="flex flex-col gap-2 w-full md:w-[50%]">
                      <div className="flex gap-4 items-center bg-sub100 border-b-2 border-sub200 py-1 px-4">
                        <span className="text-lg">①</span>
                        <Skeleton className="h-5 w-24" />
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 h-full items-center justify-center gap-1 lg:gap-4 px-4">
                        {Array.from({ length: 4 }).map((_, idx) => (
                          <div key={idx} className="flex flex-col items-center justify-start gap-2">
                            <Skeleton className="w-28 h-28" />
                            <Skeleton className="h-6 w-28" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 border-l-0 md:border-l-2 border-sub200 w-full md:w-[50%]">
                      <div className="flex bg-sub100 border-b-2 border-sub200 text-base px-4 py-1.5">
                        분석 설명
                      </div>
                      <div className="flex flex-col justify-center h-full px-4">
                        <Skeleton className="h-20 w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareBodySkeleton;
