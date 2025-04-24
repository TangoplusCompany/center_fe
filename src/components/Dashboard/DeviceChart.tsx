import React from "react";
import { IDeviceChartList } from "@/types/device";
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

const DeviceChart = ({
  chartConfig,
  chartData: getChartData,
}: {
  chartConfig: ChartConfig;
  chartData: IDeviceChartList[];
}) => {
  const chartData = [
    { date: "2024-04-01", 테스트디바이스: 222, 탱고바디32: 0 },
    { date: "2024-04-02", 테스트디바이스: 97, 탱고바디32: 180 },
    { date: "2024-04-03", 테스트디바이스: 167, 탱고바디32: 120 },
    { date: "2024-04-04", 테스트디바이스: 242, 탱고바디32: 260 },
    { date: "2024-04-05", 테스트디바이스: 373, 탱고바디32: 290 },
    { date: "2024-04-06", 테스트디바이스: 301, 탱고바디32: 340 },
    { date: "2024-04-07", 테스트디바이스: 245, 탱고바디32: 180 },
    { date: "2024-04-08", 테스트디바이스: 409, 탱고바디32: 320 },
    { date: "2024-04-09", 테스트디바이스: 59, 탱고바디32: 110 },
    { date: "2024-04-10", 테스트디바이스: 261, 탱고바디32: 190 },
    { date: "2024-04-11", 테스트디바이스: 327, 탱고바디32: 350 },
    { date: "2024-04-12", 테스트디바이스: 292, 탱고바디32: 210 },
    { date: "2024-04-13", 테스트디바이스: 342, 탱고바디32: 380 },
    { date: "2024-04-14", 테스트디바이스: 137, 탱고바디32: 220 },
    { date: "2024-04-15", 테스트디바이스: 120, 탱고바디32: 170 },
    { date: "2024-04-16", 테스트디바이스: 138, 탱고바디32: 190 },
    { date: "2024-04-17", 테스트디바이스: 446, 탱고바디32: 360 },
    { date: "2024-04-18", 테스트디바이스: 364, 탱고바디32: 410 },
    { date: "2024-04-19", 테스트디바이스: 243, 탱고바디32: 180 },
    { date: "2024-04-20", 테스트디바이스: 89, 탱고바디32: 150 },
    { date: "2024-04-21", 테스트디바이스: 137, 탱고바디32: 200 },
    { date: "2024-04-22", 테스트디바이스: 224, 탱고바디32: 170 },
    { date: "2024-04-23", 테스트디바이스: 138, 탱고바디32: 230 },
    { date: "2024-04-24", 테스트디바이스: 387, 탱고바디32: 290 },
    { date: "2024-04-25", 테스트디바이스: 215, 탱고바디32: 250 },
    { date: "2024-04-26", 테스트디바이스: 75, 탱고바디32: 130 },
    { date: "2024-04-27", 테스트디바이스: 383, 탱고바디32: 420 },
    { date: "2024-04-28", 테스트디바이스: 122, 탱고바디32: 180 },
    { date: "2024-04-29", 테스트디바이스: 315, 탱고바디32: 240 },
    { date: "2024-04-30", 테스트디바이스: 454, 탱고바디32: 380 },
    { date: "2024-05-01", 테스트디바이스: 165, 탱고바디32: 220 },
    { date: "2024-05-02", 테스트디바이스: 293, 탱고바디32: 310 },
    { date: "2024-05-03", 테스트디바이스: 247, 탱고바디32: 190 },
    { date: "2024-05-04", 테스트디바이스: 385, 탱고바디32: 420 },
    { date: "2024-05-05", 테스트디바이스: 481, 탱고바디32: 390 },
    { date: "2024-05-06", 테스트디바이스: 498, 탱고바디32: 520 },
    { date: "2024-05-07", 테스트디바이스: 388, 탱고바디32: 300 },
    { date: "2024-05-08", 테스트디바이스: 149, 탱고바디32: 210 },
    { date: "2024-05-09", 테스트디바이스: 227, 탱고바디32: 180 },
    { date: "2024-05-10", 테스트디바이스: 293, 탱고바디32: 330 },
    { date: "2024-05-11", 테스트디바이스: 335, 탱고바디32: 270 },
    { date: "2024-05-21", 테스트디바이스: 82, 탱고바디32: 140 },
    { date: "2024-05-22", 테스트디바이스: 81, 탱고바디32: 120 },
    { date: "2024-05-23", 테스트디바이스: 252, 탱고바디32: 290 },
    { date: "2024-05-24", 테스트디바이스: 294, 탱고바디32: 220 },
    { date: "2024-05-25", 테스트디바이스: 201, 탱고바디32: 250 },
    { date: "2024-06-03", 테스트디바이스: 103, 탱고바디32: 160 },
    { date: "2024-06-04", 테스트디바이스: 439, 탱고바디32: 380 },
    { date: "2024-06-05", 테스트디바이스: 88, 탱고바디32: 140 },
    { date: "2024-06-06", 테스트디바이스: 294, 탱고바디32: 250 },
    { date: "2024-06-07", 테스트디바이스: 323, 탱고바디32: 370 },
    { date: "2024-06-08", 테스트디바이스: 385, 탱고바디32: 320 },
    { date: "2024-06-17", 테스트디바이스: 475, 탱고바디32: 520 },
    { date: "2024-06-18", 테스트디바이스: 107, 탱고바디32: 170 },
    { date: "2024-06-19", 테스트디바이스: 341, 탱고바디32: 290 },
    { date: "2024-06-20", 테스트디바이스: 408, 탱고바디32: 450 },
    { date: "2024-06-21", 테스트디바이스: 169, 탱고바디32: 210 },
    { date: "2024-06-22", 테스트디바이스: 317, 탱고바디32: 270 },
    { date: "2024-06-28", 테스트디바이스: 149, 탱고바디32: 200 },
    { date: "2024-06-29", 테스트디바이스: 103, 탱고바디32: 160 },
    { date: "2024-06-30", 테스트디바이스: 446, 탱고바디32: 400 },
  ];
  const [timeRange, setTimeRange] = React.useState("1m");
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 30;
    if (timeRange === "1w") {
      daysToSubtract = 7;
    } else if (timeRange === "3m") {
      daysToSubtract = 90;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
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
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
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
            <Area
              dataKey="탱고바디32"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="테스트디바이스"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DeviceChart;
