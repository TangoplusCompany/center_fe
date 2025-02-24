"use client";

import { AreaChartComponent } from "@/components/chart/Area";
import { ChartConfig } from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const chartConfig = {
  kiosk: {
    label: "Kiosk",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const MainAreaChart = ({ className }: { className?: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["centerData"],
    queryFn: async () => {
      const response = await fetch("/api/center");
      return response.json();
    },
  });

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : data.length > 0 ? (
        <AreaChartComponent
          title="센터 서비스 이용 현황"
          description="센터 사용자들의 서비스 이용 현황 그래프 입니다."
          config={chartConfig}
          data={data}
          className={`${className}`}
        />
      ) : (
        <p>데이터가 존재하지 않습니다.</p>
      )}
    </>
  );
};

export default MainAreaChart;
