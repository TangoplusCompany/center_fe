import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { IMeasureROMItem } from "@/types/measure";
import { Area, AreaChart, CartesianGrid } from "recharts";

export interface ROMItemCardProps {
  romItem: IMeasureROMItem
  onROMItemSelect ?: (romSn: number | undefined, isLeft: boolean) => void;
  idx: number;
}

export const ROMItemCard = ({
  romItem,
  onROMItemSelect,
  idx
} : ROMItemCardProps) => {

  const chartData = Object.entries(romItem.history_by_measuretype).map(([date, value]) => ({
    date,
    value,
  }))
  return (
    <div 
      className="flex flex-col gap-2 p-2 border-2 border-sub100 rounded-2xl hover:border-toggleAccent transition-colors cursor-pointer"
      onClick={() => {
        if (onROMItemSelect) onROMItemSelect(romItem.sn, idx % 2 === 0 ? true : false); // TODO 이 곳에다가 romItem을 식별할 수 있는 번호를 넣어줘야함
      }}
    >
      <div className="flex gap-2">
        <div className="w-20 h-20 flex flex-shrink-0 rounded-2xl bg-sub200 items-center justify-center">
          이미지
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-base font-semibold text-sub700">
            {romItem.title}
          </div>
          <div className="text-base text-sub700">
            {romItem.howto}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex h-full items-center text-base text-sub700">
          최근 측정일 : {romItem.reg_date}
        </div>

        <div className="flex flex-col gap-2 rounded-xl p-4 bg-white dark:bg-black">
          <span className="text-lg font-semibold">
            이전 기록 비교
          </span>

          <ChartContainer
            config={{
              value: {
                label: "각도값",
                color: "hsl(var(--toggle-accent))",
              },
            }}
            className="aspect-auto h-[64px] w-full"
          >
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--toggle-accent))" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(var(--toggle-accent-background))" stopOpacity={0.4} />
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
      </div>
    </div>
  );
};

export default ROMItemCard;