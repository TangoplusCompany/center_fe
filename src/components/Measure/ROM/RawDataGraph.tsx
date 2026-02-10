import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid } from "recharts";

export interface RawDataGraphProps {
  graphType: 0 | 1;
  data: number[]
}

export const ROMRawDataGraph = ({
  graphType,
  data // velocityData 또는 angleData
}: RawDataGraphProps) => {
  // 데이터를 차트에 맞게 변환 (index를 x축으로)
  const chartData = data.map((value, index) => ({
    frame: index,
    value: value
  }));

  return (
    <div className="flex flex-col gap-2 rounded-xl p-4 bg-toggleAccent-background">
      <span className="text-lg font-semibold">
        {graphType === 0 ? '각도 변화' : '각속도 변화'}
      </span>

      <ChartContainer
        config={{
          value: {
            label: graphType === 0 ? "각도" : "각속도",
            color: "hsl(var(--toggle-accent))",
          },
        }}
        className="aspect-auto h-[100px] w-full "
      >
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--toggle-accent))" stopOpacity={0.4} />
              <stop offset="100%" stopColor="hsl(var(--toggle-accent))" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <Area
            dataKey="value"
            type="monotone"
            fill="url(#fillGradient)"
            stroke="hsl(var(--toggle-accent))"
            strokeWidth={2}
          />
          
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(value) => `프레임 ${value}`}
              />
            }
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};
export default ROMRawDataGraph;