"use client";

import { useGetDeviceStatus } from "@/hooks/api/device/useDeviceStatus";
import { useQueryParams } from "@/hooks/utils/useQueryParams";
import { IDeviceStatus } from "@/types/device";
import React, { useRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { useTranslations } from "next-intl";

const DummyMeasureDeviceTab = () => {
  return <Skeleton className="w-[256px] h-[36px]" />;
};

const MeasureDeviceTab = () => {
  const t = useTranslations("Index");
  const { query, setQueryParam } = useQueryParams();
  const deviceSn = query.device_sn || "0";
  const scrollRef = useRef<HTMLDivElement>(null);

  // 마우스 드래그 관련 상태
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  const {
    data: measureDeviceResponse,
    isLoading,
    isError,
  } = useGetDeviceStatus<IDeviceStatus>();

  const handleDeviceClick = (sn: number) => {
    // 드래그 중일 때는 클릭 이동 방지
    if (hasMoved) return;
    setQueryParam([
      ["device_sn", sn],
      ["page", "1"],
    ]);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // 드래그 속도 조절
    if (Math.abs(walk) > 5) setHasMoved(true);
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  if (isLoading) return <DummyMeasureDeviceTab />;
  if (isError) return <div>Error...</div>;
  if (!measureDeviceResponse) return <div>No data</div>;

  return (
    <div
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      className={`w-full max-w-full overflow-x-auto overflow-y-hidden select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      <div className="inline-flex rounded-xl bg-sub200 p-1 gap-1 w-max">
        {/* 전체 조회 */}
        <button
          type="button"
          className={`${
            deviceSn === "0"
              ? "bg-mainBlue-600 text-white shadow-sm"
              : "text-sub600 hover:text-sub700"
          } px-4 py-1 text-sm font-medium rounded-xl transition-all whitespace-nowrap`}
          onClick={() => handleDeviceClick(0)}
        >
          {t("btn_search_view_all")}
        </button>

        {/* 디바이스 목록 */}
        {measureDeviceResponse.data.map((device, index) => {
          const active = deviceSn === device.device_sn.toString();

          return (
            <button
              key={device.device_name + index}
              type="button"
              className={`${
                active
                  ? "bg-mainBlue-600 text-white shadow-sm"
                  : "text-sub600 hover:text-sub800"
              } px-4 py-1 text-sm font-medium rounded-xl transition-all whitespace-nowrap`}
              onClick={() => handleDeviceClick(device.device_sn)}
            >
              {device.device_name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MeasureDeviceTab;