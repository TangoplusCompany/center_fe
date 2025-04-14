import React from "react";
import { AreaChartComponent } from "../Chart/Area";
import { ChartConfig } from "../ui/chart";
import { useGetDeviceAnalytics } from "@/hooks/device/useGetDeviceAnalytics";

const chartConfig = {
  kiosk: {
    label: "탱고바디1",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "탱고바디2",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export const DeviceAnalytics = () => {
  const { data, isLoading } = useGetDeviceAnalytics();
  if (!data) return <p>데이터가 존재하지 않습니다.</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <AreaChartComponent
      title="센터 기기 이용 현황"
      description="센터 사용자들의 기기 이용 현황 그래프 입니다."
      config={chartConfig}
      data={data}
      className={`shadow-none rounded-lg`}
    />
  );
};