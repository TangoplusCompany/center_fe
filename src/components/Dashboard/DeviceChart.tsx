import React from "react";
import { DeviceChartList } from "@/types/device";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Select,
} from "../ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

const pastelColors = [
  "#FFD1DC", // Pastel Pink
  "#AEC6CF", // Pastel Blue
  "#B39EB5", // Pastel Purple
  "#77DD77", // Pastel Green
  "#FFB347", // Pastel Orange
  "#FDFD96", // Pastel Yellow
  "#CFCFC4", // Pastel Gray
  "#C1E1C1", // Pastel Mint
  "#F49AC2", // Pastel Rose
  "#B0E0E6", // Pastel Aqua
];

const DeviceChart = ({
  chartConfig,
  chartData,
}: {
  chartConfig: ChartConfig;
  chartData: DeviceChartList[];
}) => {
  const [timeRange, setTimeRange] = React.useState("1m");
  const filteredData = chartData
    .filter((item) => {
      const date = new Date(item.date);
      const referenceDate = new Date();
      let daysToSubtract = 30;
      if (timeRange === "1w") {
        daysToSubtract = 7;
      } else if (timeRange === "3m") {
        daysToSubtract = 90;
      }
      const startDate = new Date(referenceDate);
      startDate.setDate(startDate.getDate() - daysToSubtract);
      return date >= startDate;
    })
    .reverse()
    .sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  return (
    <Card className="rounded-lg shadow-none">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>센터 키오스크 사용자 추이</CardTitle>
          <CardDescription>
            선택하신 날짜를 기준으로 사용자 추이를 가져옵니다.
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="1w" className="rounded-lg">
              최근 1주일
            </SelectItem>
            <SelectItem value="1m" className="rounded-lg">
              최근 한달
            </SelectItem>
            <SelectItem value="3m" className="rounded-lg">
              최근 세달
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              {Object.keys(chartConfig).map((_, index) => {
                return (
                  <linearGradient
                    id={`fill${index}`}
                    key={`fill${index}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={pastelColors[index]}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={pastelColors[index]}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                );
              })}
            </defs>
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
            {Object.keys(chartConfig).map((key, index) => {
              return (
                <Area
                  dataKey={key}
                  key={`chart-${key}`}
                  type="natural"
                  fill={`url(#fill${index})`}
                  stroke={pastelColors[index]}
                  stackId="a"
                />
              );
            })}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DeviceChart;
