import { ChartContainer } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { useId } from "react";
import { IMoireGraphTitle } from "./Container";

export const RISK_RECORD = {
  0: { label: "정상", badgeCss: "bg-sub600 dark:bg-gray-600" },
  1: { label: "주의", badgeCss: "bg-warning" },
  2: { label: "위험", badgeCss: "bg-danger" },
} as const;

export interface IMoireGraphProps {
  title: IMoireGraphTitle;
  risk: number;
  leftValue: number;
  rightValue: number;
  leftIndex: number;
  rightIndex: number;
  unit: string;
  description: string;
  indexData: number[];
}
interface CustomDotProps {
  cx?: number;
  cy?: number;
  index?: number;
}
export default function MoireGraph({ graphData }: { graphData: IMoireGraphProps }) {
  const uniqueId = useId().replace(/:/g, "");

  // 1차원 숫자 배열을 Recharts용 데이터(x: 인덱스, zValue: 수치)로 변환
  const chartData = (graphData.indexData || []).map((zValue, x) => ({ x, zValue }));

  const total = chartData.length;
  const minX = 0;
  const maxX = total > 0 ? total - 1 : 100;
  const midX = (minX + maxX) / 2;

  // X축 5등분 틱 계산 (중앙 0 위치 고정)
  const xTicks = [minX, (minX + midX) / 2, midX, (midX + maxX) / 2, maxX];
  const currentRisk = RISK_RECORD[graphData.risk as keyof typeof RISK_RECORD] || RISK_RECORD[0];
  const renderCustomDot = (props: CustomDotProps): React.ReactElement<SVGElement> => {
    const { cx, cy, index } = props;

    if (cx === undefined || cy === undefined || index === undefined) {
      return <g key="empty" />;
    }

    let color = "";
    if (index === graphData.leftIndex) {
      color = "#5B93FF"; // Left: mainBlue-300
    } else if (index === graphData.rightIndex) {
      color = "#49D68F"; // Right: mainGreen-600
    } else {
      return <g key={`dot-${index}`} />;
    }

    return (
      <g key={`dot-${index}`}>
        {/* 외곽 은은한 테두리 Ring */}
        <circle
          cx={cx}
          cy={cy}
          r={11}
          fill={`${color}20`}
          stroke={color}
          strokeWidth={1.5}
          strokeOpacity={0.6}
        />
        {/* 중앙 원형 Solid Dot */}
        <circle cx={cx} cy={cy} r={5.5} fill={color} />
      </g>
    );
  };
  const subTitle: string = graphData.title.includes("허리") ? "중심선 편위" : "높이 차";
  return (
    <div className="flex flex-col rounded-xl border-2 border-sub200 p-4 bg-white">
      {/* Header */}
      <div className="flex w-full items-center justify-between mb-2">
        <span className="text-sm sm:text-base font-semibold text-sub700">{graphData.title}</span>
        <span className={`px-2.5 py-0.5 rounded-full text-xs text-white font-medium ${currentRisk.badgeCss}`}>
          {currentRisk.label}
        </span>
      </div>

      <div className="grid grid-cols-[60%_40%] gap-2">
        <ChartContainer config={{}} className="aspect-auto h-[150px] w-full">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={`fillVal-${uniqueId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#2563EB" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#e5e7eb" vertical horizontal />

            <XAxis
              dataKey="x"
              type="number"
              domain={[minX, maxX]}
              ticks={xTicks}
              tickLine={false}
              axisLine={{ stroke: "#374151" }}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              tickFormatter={(val) => {
                if (Math.abs(val - minX) < 0.1) return `L -30`;
                if (Math.abs(val - midX) < 0.1) return `0`;
                if (Math.abs(val - maxX) < 0.1) return `R +30`;
                return "";
              }}
            />

            <YAxis
              domain={[-6, 6]}
              ticks={[-6, 0, 6]}
              tickLine={false}
              axisLine={{ stroke: "#374151" }}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              tickFormatter={(val) => (val > 0 ? `+${val}` : `${val}`)}
            />

            <Area
              dataKey="zValue"
              type="monotone"
              fill={`url(#fillVal-${uniqueId})`}
              stroke="#2563EB"
              strokeWidth={3}
              dot={renderCustomDot}
            />
          </AreaChart>
        </ChartContainer>
        

        <div className="flex flex-col gap-0.5 py-2">
          <span className="text-xs sm:text-sm font-semibold text-sub700">{subTitle} {Math.abs(graphData.leftValue - graphData.rightValue).toFixed(1)} {graphData.unit}</span>
          <div className="flex gap-2 text-xs sm:text-sm font-semibold">
            <span className="text-mainBlue-300">L { graphData.leftValue} {graphData.unit}</span>
            <span className="text-mainGreen-600">R { graphData.rightValue} {graphData.unit}</span>
          </div>

          <span className="text-xs sm:text-sm text-sub700">{graphData.description}</span>
        </div>

      </div>
    </div>
  );
}