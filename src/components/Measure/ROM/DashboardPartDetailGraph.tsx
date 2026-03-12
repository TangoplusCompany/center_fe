import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { useMemo } from "react";
import { Area, AreaChart, DotProps, XAxis, YAxis } from "recharts";

export interface ROMDashboardPartDetailGraphProps {
  romGraph: Record<string, number>
}
const FIXED_SLOTS = 10;
const ROMDashboardPartDetailGraph = ({
  romGraph
}: ROMDashboardPartDetailGraphProps
) => {
  
  const chartData = useMemo(() => {
    const sorted = Object.entries(romGraph)
      .map(([date, score]) => ({ date, score }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const dummy = Array.from(
      { length: Math.max(0, FIXED_SLOTS - sorted.length) },
      () => ({ date: " ", score: -1 })  
    )

    return [...dummy, ...sorted]
  }, [romGraph])
  const stateString = (score: number) => {
    if (score === 3) return "매우 양호"
    if (score === 2) return "정상"
    if (score === 1) return "주의"
    if (score === 0) return "위험"
    
  };
  return (
    <div className="flex flex-col gap-2 border-2 border-sub200 rounded-xl py-4 px-2 h-full items-center justify-center">
      <div className="h-36 w-full">
        <ChartContainer
          config={{
            score: {
              label: "점수",
              color: "hsl(var(--toggle-accent))",
            },
          }}
          className="h-36 w-full"
        >
          <AreaChart data={chartData} margin={{ top: 16, right: 16, left: 16, bottom: 16 }}>
            <defs>
              <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--toggle-accent))" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(var(--toggle-accent-background))" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <XAxis hide />
            <YAxis domain={[0, 3]} hide />
            <Area
              dataKey="score"
              type="monotone"
              fill="url(#fillGradient)"
              stroke="hsl(var(--toggle-accent))"
              strokeWidth={2}
              connectNulls
              dot={(props: DotProps & { value?: number }) => {
                if (!props.value || props.value === undefined) return <g key={props.key} />;
                return (
                  <circle
                    key={props.key}
                    cx={props.cx}
                    cy={props.cy}
                    r={4}
                    fill="hsl(var(--toggle-accent))"
                    stroke="white"
                    strokeWidth={1.5}
                  />
                );
              }}
              className="bg-toggleAccent-background rounded-xl w-full "
            />
            
            <ChartTooltip
              content={(props) => {
                const value = props.payload?.[0]?.value;
                if (!value || value === 0) return null;
                
                return (
                  <div className="rounded-lg border bg-background px-3 py-2 shadow-sm text-xs">
                    <p className="text-muted-foreground">날짜</p>
                    <p className="font-semibold text-foreground">{stateString(0)}</p>
                  </div>
                );
              }}
            />
          </AreaChart>
        </ChartContainer>
      </div>
      <div className="w-full grid grid-cols-10 gap-2">
        {chartData.map((item, index) => (
          <div key={index} className="text-center text-xs text-sub500 whitespace-nowrap">
            {item.date === " " ? "" : item.date}
          </div>
        ))}
      </div>
    </div>
  );

}
export default ROMDashboardPartDetailGraph;