import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export interface SegmentData {
  label: string;
  percentage: number;
  color: string; 
}

interface PieChartBarProps {
  data: SegmentData[];
  innerRadius?: number; 
  outerRadius?: number; 
}

export default function PieChartBar({
  data,
  innerRadius = 50,
  outerRadius = 80,
}: PieChartBarProps) {
  return (
    <div className="w-48 h-48">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip 
            contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #e5e7eb" }}
            itemStyle={{ fontSize: "12px" }}
            formatter={(value: number, name: string) => [`${value}%`, name]}
          />
          <Pie
            data={data}
            dataKey="percentage"
            nameKey="label"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2} 
            isAnimationActive={true} 
            animationBegin={0}
            animationDuration={800}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color.startsWith('#') ? entry.color : undefined}
                className={!entry.color.startsWith('#') ? entry.color : ''} 
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}