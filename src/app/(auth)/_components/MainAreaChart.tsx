"use client";

import { AreaChartComponent } from "@/components/chart/Area";
import { ChartConfig } from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

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
  const [centerData, setCenterData] =
    React.useState<{ [key: string]: string | number }[]>();
  const { data } = useQuery({
    queryKey: ["centerData"],
    queryFn: async () => {
      const response = await fetch("/api/center");
      return response.json();
    },
  });
  useEffect(() => {
    setCenterData(data);
  }, [data]);

  return (
    <>
      {centerData && centerData.length > 0 ? (
        <AreaChartComponent
          title="센터 서비스 이용 현황"
          description="센터 사용자들의 서비스 이용 현황 그래프 입니다."
          config={chartConfig}
          data={centerData}
          className={`${className}`}
        />
      ) : null}
    </>
  );
};

export default MainAreaChart;
