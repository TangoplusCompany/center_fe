"use client";
import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";

const chartConfig = {
  visitors: {
    label: "사용자",
  },
  chrome: {
    label: "모바일",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "키오스크",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const MainUserDonutChart = ({ className }: { className: string }) => {
  const [chartData, setChartData] = React.useState<
    { browser: string; visitors: number; fill: string }[] | null
  >([]);
  const { data } = useQuery({
    queryKey: ["centerUserDevice"],
    queryFn: async () => {
      const response = await fetch("/api/center/use");
      return response.json();
    },
  });

  const totalVisitors = React.useMemo(() => {
    if (!chartData) {
      return null;
    }
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [chartData]);
  React.useEffect(() => {
    setChartData(data);
  }, [data]);
  return (
    <Card className={`${className} flex flex-col`}>
      <CardHeader className="items-center pb-0">
        <CardTitle>최근 사용자 기기 분석</CardTitle>
        <CardDescription>최근 1달간 사용자 기준</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {chartData && (
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalVisitors && totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            이용자
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            )}
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default MainUserDonutChart;
