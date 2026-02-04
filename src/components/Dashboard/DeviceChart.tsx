import React from "react";
import {  DeviceDailyUsage } from "@/types/device";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  // ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../ui/card";

interface TransformedChartData {
  date: string;
  [deviceKey: string]: string | number; // device_sn을 포함한 고유 키
}

const pastelColors = [
  "#ffe4e1", // Pastel Pink
  "#e0ffff", // Pastel Blue
  "#d8bfd8", // Pastel Purple
  "#77DD77", // Pastel Green
  "#ffdab9", // Pastel Orange
  "#eee8aa", // Pastel Yellow
  "#d3d3d3", // Pastel Gray
  "#bdb76b", // Pastel Mint
  "#bc8f8f", // Pastel Rose
  "#b0e0e6 ", // Pastel Aqua
];
const COLOR_ACTIVE = "hsl(var(--toggle-accent))"; // 또는 "#..."로 직접
const COLOR_INACTIVE = "hsl(var(--sub300))";

const DeviceChart = ({
  chartConfig,
  chartData,
}: {
  chartConfig: ChartConfig;
  chartData: DeviceDailyUsage[];
}) => {
  const [selectedLegend, setSelectedLegend] = React.useState<string | null>('all');
  

  const transformChartData = (data: DeviceDailyUsage[]): TransformedChartData[] => {
    if (!data || data.length === 0) return [];

    // 날짜 기준 내림차순 정렬 (최신이 왼쪽)
    const sortedData = [...data].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return sortedData.map(item => {
      const result: TransformedChartData = { date: item.date };
      
      // device_sn을 포함한 고유 키로 변환
      item.devices.forEach(device => {
        const uniqueKey = `${device.device_name} (${device.device_sn})`;
        result[uniqueKey] = device.count;
      });
      
      return result;
    });
  };

  // 데이터 변환
  const transformedData = React.useMemo(() => 
    transformChartData(chartData), 
    [chartData]
  );

  const seriesKeys = React.useMemo(() => {
    const first = transformedData?.[0];
    if (!first) return [];
    return Object.keys(first).filter((k) => k !== "date");
  }, [transformedData]);

  const getStroke = (key: string, index: number) => {
    if (selectedLegend === "all") return pastelColors[index];
    return selectedLegend === key ? COLOR_ACTIVE : COLOR_INACTIVE;
  };

  const legendKeys = React.useMemo(
    () => ["all", ...seriesKeys],
    [seriesKeys]
  );

  const getSeriesColor = (key: string, index: number) => {
    // 전체보기면 기존 pastelColors 그대로
    if (selectedLegend === "all") return pastelColors[index];

    // 전체보기 버튼(legend 0)은 선택모드에선 sub300로 표시(원하시면 toggleAccent로 바꿔도 됨)
    if (key === "all") return "hsl(var(--sub300))";

    // 선택모드면 선택된 것만 toggleAccent, 나머지 sub300
    return selectedLegend === key
      ? "hsl(var(--toggleAccent))"
      : "hsl(var(--sub300))";
  };
  return (
    <Card className="rounded-lg shadow-none border-2 border-toggleAccent-background">
      <CardHeader className="flex items-center gap-2 space-y-0 border-2 border-toggleAccent-background py-2 sm:flex-row bg-toggleAccent-background">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle className="text-toggleAccent text-xl">센터 키오스크 사용자 추이</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={transformedData}>
            <defs>
              {/* 각 시리즈마다 고유한 그라데이션 생성 */}
              {seriesKeys.map((key, index) => {
                const color = pastelColors[index]; // 또는 적절한 방식으로 색상 가져오기
                return (
                  <linearGradient key={`gradient-${key}`} id={`fill-gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.6} />
                    <stop offset="100%" stopColor="white" stopOpacity={0.05} />
                  </linearGradient>
                );
              })}
              <linearGradient id="fill-gradient-accent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--toggle-accent))" stopOpacity={0.6} />
                <stop offset="100%" stopColor="white" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            {/* Area에서 사용 */}
            {seriesKeys.map((key, index) => {
              const isAll = selectedLegend === "all";
              const isActive = isAll || selectedLegend === key;
              const strokeColor = getStroke(key, index);
              const isSelected = selectedLegend === key;
              let fillValue = "transparent";
              if (isSelected) {
                fillValue = "url(#fill-gradient-accent)"; // 선택된 항목은 accent 색상
              } else if (isAll) {
                fillValue = "transparent"; // 전체 보기일 때는 투명
              }

              return (
                <Area
                  dataKey={key}
                  key={`chart-${key}`}
                  type="natural"
                  fill={fillValue}
                  stroke={strokeColor}
                  strokeOpacity={isActive ? 1 : 0.35}
                  fillOpacity={isActive ? 1 : 0.3}
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
              );
            })}
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("ko-KR", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("ko-KR", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            
            <ChartLegend
              content={() => {
                return (
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {legendKeys.map((key) => {
                      const isAll = key === "all";
                      const isSelected = selectedLegend === key;

                      // series index: all은 -1, 나머지는 seriesKeys에서 찾기
                      const seriesIndex = isAll ? -1 : seriesKeys.indexOf(key);

                      const dotColor = isAll
                        ? (selectedLegend === "all" ? "hsl(var(--toggleAccent))" : "hsl(var(--sub300))")
                        : getSeriesColor(key, seriesIndex);

                      // 버튼 스타일(선택된 pill만 강조)
                      const pillActive = isSelected;
                      return (
                        <button
                          key={`legend-${key}`}
                          type="button"
                          onClick={() => {
                              setSelectedLegend(key)
                            }
                          }
                          className={[
                            "flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition",
                            pillActive
                              ? "bg-chartLegendActive text-chartLegendActive-foreground"
                              : "bg-sub300/20 text-sub300 hover:bg-sub300/30 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/15",
                          ].join(" ")}
                        >
                          {/* ✅ 색상 dot */}
                          <span
                            className="inline-block h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: dotColor }}
                          />
                          {isAll ? "전체보기" : (chartConfig[key]?.label ?? key)}
                        </button>
                      );
                    })}
                  </div>
                );
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DeviceChart;
