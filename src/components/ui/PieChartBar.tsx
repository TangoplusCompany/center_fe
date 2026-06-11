import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export interface SegmentData {
  label: string;
  percentage: number;
  color: string; // HEX (#5D8DFF) 또는 Tailwind 클래스명 (여기서는 HEX 권장)
}

interface PieChartBarProps {
  data: SegmentData[];
  innerRadius?: number; // 도넛 안쪽 반지름
  outerRadius?: number; // 도넛 바깥쪽 반지름
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
            // 툴팁 스타일을 커스텀하고 싶다면 아래 속성들을 활용하세요 (선택사항)
            contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #e5e7eb" }}
            itemStyle={{ fontSize: "12px" }}
          />
          <Pie
            data={data}
            dataKey="percentage"
            nameKey="label"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2} // 조각 사이의 간격
            isAnimationActive={true} // 애니메이션 활성화
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