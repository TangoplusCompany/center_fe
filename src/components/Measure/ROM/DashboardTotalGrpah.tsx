import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

export interface ROMDashboardTotalGraphData {
  label: string;
  score0: number; // 위험
  score1: number; // 주의
  score2: number; // 정상
  score3: number; // 매우 양호
}

interface Props {
  userSn : number;
  isMyPage: boolean;
}

const SCORE_LABELS: Record<string, { label: string; color: string }> = {
  score3: { label: "매우 양호", color: "hsl(var(--toggle-accent))" },
  score2: { label: "정상",     color: "hsl(var(--toggle-accent-background))" },
  score1: { label: "주의",     color: "hsl(var(--warning))" },
  score0: { label: "위험",     color: "hsl(var(--danger))" },
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (!active || !payload?.length) return null;

  const sorted = [...payload].sort((a, b) => {
    const aKey = typeof a.dataKey === "string" ? Number(a.dataKey.replace("score", "")) : 0;
    const bKey = typeof b.dataKey === "string" ? Number(b.dataKey.replace("score", "")) : 0;
    return bKey - aKey;
  });
  const total = sorted.reduce((sum, entry) => sum + (Number(entry.value) || 0 ), 0);
  return (
    <div
      style={{
        background: "hsl(var(--background))",
        border: "1px solid hsl(var(--border))",
        borderRadius: 8,
        padding: "10px 14px",
        fontSize: 13,
      }}
    >
      <p style={{ fontWeight: 600, marginBottom: 6 }}>{label}</p>
      {sorted.map((entry) => {
        if (typeof entry.dataKey !== "string") return null;

        const meta = SCORE_LABELS[entry.dataKey];
        if (!meta) return null;
        return (
          <div
            key={entry.dataKey}
            style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                backgroundColor: meta.color,
                flexShrink: 0,
              }}
            />
            <span style={{ color: "hsl(var(--muted-foreground))" }}>{meta.label}</span>
            <span style={{ marginLeft: "auto", fontWeight: 600, paddingLeft: 16 }}>
              {entry.value}건
            </span>
          </div>
        );
      })}
      <div
        style={{
          borderTop: "1px solid hsl(var(--border))",
          marginTop: 6,
          paddingTop: 6,
          display: "flex",
          justifyContent: "space-between"
        }}>
        <span style={{ color: "hsl(var(--muted-foreground))"}}>총</span>
        <span style={{ fontWeight: 600}}>{total}건</span>
      </div>
    </div>
  );
};


const ROMDashboardTotalGraph = ({
  // userSn,
  // isMyPage
}:Props) => {
  const defaultLimit = 1;
  const [, setSelectedMonth] = useState<number>(defaultLimit);
  const handleSelectChange = (value: string) => {
    setSelectedMonth(Number(value));
  };
  // const centerSn = useAuthStoreOptional((state) => state.centerSn, 0);
  // const {
  //   data: graphData, 
  //   isLoading: graphLoading,
  //   isError: graphError
  // } = useGetROMGraphData({
  //   user_sn: userSn,
  //   center_sn: centerSn,
  //   isMyPage: isMyPage,
  //   currentMonth: selectedMonth
  // })
  const sampleData: ROMDashboardTotalGraphData[] = [
    { label: "목관절", score0: 2, score1: 2, score2: 5, score3: 5 },
    { label: "어깨", score0: 5, score1: 7, score2: 8, score3: 3 },
    { label: "팔꿉", score0: 0, score1: 0, score2: 0, score3: 2 },
    { label: "몸통", score0: 0, score1: 0, score2: 5, score3: 3 },
    { label: "골반", score0: 10, score1: 2, score2: 4, score3: 6 },
    { label: "무릎", score0: 2, score1: 2, score2: 8, score3: 6 },
    { label: "발목", score0: 1, score1: 0, score2: 8, score3: 3 },
  ];
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-end shrink-0">
        <Select
          onValueChange={handleSelectChange}
          defaultValue={defaultLimit.toString()}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="행 갯수" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1개월</SelectItem>
            <SelectItem value="3">3개월</SelectItem>
            <SelectItem value="6">6개월</SelectItem>
            <SelectItem value="12">12개월</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={sampleData}
          margin={{ top: 10, right: 16, left: 0, bottom: 4 }}
          barCategoryGap="30%"
        >
          <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 16, fill: "hsl(var(--muted-foreground))" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
          />
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.04)" }}
            content={<CustomTooltip />}
          />

          <Bar dataKey="score0" stackId="a" fill="hsl(var(--danger-foreground))"  radius={0} />
          <Bar dataKey="score1" stackId="a" fill="hsl(var(--warning-foreground))" radius={0} />
          <Bar dataKey="score2" stackId="a" fill="hsl(var(--toggle-accent-background))" radius={0} />
          <Bar dataKey="score3" stackId="a" fill="hsl(var(--toggle-accent))" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
    
  );
};

export default ROMDashboardTotalGraph;