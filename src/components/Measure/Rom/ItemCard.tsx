import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { IMeasureROMItem } from "@/types/measure";
import { useMemo } from "react";
import { Area, AreaChart, DotProps, XAxis, YAxis } from "recharts";

export interface ROMItemCardProps {
  romItem: IMeasureROMItem
  handleROMItemSelect : (measureType: number) => void
}
const FIXED_SLOTS = 5;

export const ROMItemCard = ({
  romItem,
  handleROMItemSelect,
} : ROMItemCardProps) => {

  const chartData = useMemo(() => {
    const sorted = Object.entries(romItem.history_by_measure_type)
     .map(([date, value]) => ({date, value}))
     .sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const dummy = Array.from(
      { length: Math.max(0, FIXED_SLOTS - sorted.length) },
      () => ({ date: " ", value: undefined }) 
    );                

    return [...sorted, ...dummy] 
  }, [romItem.history_by_measure_type]);

  const seriesKeys = useMemo(
    () => chartData
      // .filter((d) => !d.date.startsWith(" "))
      .map((d) => d.date),
    [chartData]
  );

  const currentValue = useMemo(
    () => chartData.find((d) => d.date === romItem.reg_date)?.value ?? 0,
    [chartData, romItem.reg_date]
  );

  const stateString :Record<number, string> = {
    0 : "위험",
    1 : "주의",
    2 : "정상",
    3 : "매우 양호"
  }
  const stateTextColor : Record<number, string> = {
    0 : "text-danger",
    1 : "text-warning",
    2 : "text-mainBlue-600",
    3 : "text-mainBlue-600"
  }
  const stateBorderColor : Record<number, string> = {
    0 : "border-danger",
    1 : "border-warning",
    2 : "border-mainBlue-600",
    3 : "border-mainBlue-600"
  }
  const stateBGColor : Record<number, string> = {
    0 : "bg-danger",
    1 : "bg-warning",
    2 : "bg-mainBlue-600",
    3 : "bg-mainBlue-600"
  }
  return (
    <div
      className="col-span-1 items-center justify-between rounded-xl border-2 border-mainBlue-100 dark:border-mainBlue-600 relative transition-colors hover:border-mainBlue-600 cursor-pointer"
      onClick={() => {
        if (handleROMItemSelect) handleROMItemSelect(romItem.measure_type);
      }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between rounded-t-xl bg-mainBlue-100  dark:bg-mainBlue-900 px-4 py-2 w-full">
          <div className="text-xl text-mainBlue-600 dark:text-white font-semibold ">
           
            {romItem.title}
          </div>

          <div className={` flex gap-2 text-sm font-semibold border-2 rounded-full px-2 py-1 items-center ${stateTextColor[romItem.score]} ${stateBorderColor[romItem.score]}`}>
            <div className={`w-4 h-4 rounded-full ${stateBGColor[romItem.score]}`}/>
            {stateString[romItem.score]}
          </div>
        </div>
        
        <div className="flex flex-col w-full min-h-32 gap-2 p-2">
          <div className="flex flex-col gap-1 px-2">
            <p className="text-base font-semibold">
              최대각도: { Math.abs(currentValue).toFixed(1) }º
            </p>
            <p className="text-base ">
              {romItem.howto}
            </p>
          </div>


          <div className="w-full px-2">
            <ChartContainer
              config={{
                value: {
                  label: "각도값",
                  color: "#2563EB",
                },
              }}
              className="h-24 w-full bg-mainBlue-100  dark:bg-mainBlue-900 rounded-xl "
            >
              <AreaChart data={chartData} margin={{ top: 16, right: 16, left: 16, bottom: 16 }}>
                <defs>
                  <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#F1F5F9" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" hide />
                <YAxis hide />
                <Area
                  dataKey="value"
                  type="monotone"
                  fill="url(#fillGradient)"
                  stroke="#2563EB"
                  strokeWidth={2}
                  connectNulls
                  dot={(props: DotProps & { value?: number; payload?: { score?: number } }) => {

                    if (props.payload?.score === undefined || props.payload?.score === null) return <g key={props.key} />;
                    return (
                      <circle
                        key={props.key}
                        cx={props.cx}
                        cy={props.cy}
                        r={4}
                        fill="#2563EB"
                        stroke="white"
                        strokeWidth={1.5}
                      />
                    );
                  }}
                  className="bg-mainBlue-100  dark:bg-mainBlue-900 rounded-xl w-full "
                />
                
                <ChartTooltip
                  content={(props) => {
                    const value = props.payload?.[0]?.value;
                    if (!value || value === 0) return null;
                    
                    return (
                      <div className="rounded-lg border bg-background px-3 py-2 shadow-sm text-xs">
                        <p className="text-muted-foreground">{props.label?.startsWith("dummy") ? "" : props.label}</p>
                        <p className="font-semibold text-foreground">{Number(value).toFixed(1)}º</p>
                      </div>
                    );
                  }}
                />
              </AreaChart>
            </ChartContainer>
          </div>

          <div className="flex items-center justify-between px-2">
            {seriesKeys.map((key, i) => (
              <span key={`${key}-${i}`} className="flex-1 text-center text-sm text-sub600">
                {key === " " ? " " : key.slice(0, 11)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROMItemCard;