import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";
import type { IBiaData } from "../../../types/bia";
import { SVGProps } from "react";


// 1. 차트 데이터 배열의 각 객체 타입을 명확히 선언합니다.
interface PentagonChartDataItem {
  subject: string;      // 부위 명칭 (예: "오른팔", "왼팔")
  value: number;        // 현재 측정값
  lastValue: number;    // 이전 측정값
  weight: number;       // 무게 (kg)
  percent: string;      // 퍼센트 문자열 (예: "105%")
  status: string;       // 상태 (예: "표준이상", "표준")
}

interface RechartsTickProps extends SVGProps<SVGTextElement> {
  x?: number;
  y?: number;
  payload?: {
    value: string;
    coordinate: number;
    index: number;
  };
}

export function PentagonChart({
  data,
  isMuscle,
}: {
  data: PentagonChartDataItem[];
  isMuscle: boolean;
}) {
  
  // 3. props에 정확한 타입을 매핑하고 구조 분해 할당 진행
  const CustomAngleAxis = (props: RechartsTickProps) => {
    const { payload, x, y } = props;
    
    // 방어 코드
    if (!payload || x === undefined || y === undefined) return <g />;

    const item = data.find((d) => d.subject === payload.value);
    // 💡 Recharts 타입 호환성을 위해 null 대신 빈 <g /> 반환
    if (!item) return <g />;

    return (
      <g transform={`translate(${x},${y})`} style={{ overflow: "visible" }}>
        {/* 1. Subject (제목) */}
        <text
          textAnchor="middle"
          fill="#333"
          fontSize="9"
          fontWeight="bold"
          dy="-12"
        >
          {item.subject}
        </text>

        <text textAnchor="middle" fill="#666" dy="1">
          <tspan fontSize="9">{item.weight}kg</tspan>
          <tspan fontSize="7" fill="#999">{` (${item.percent})`}</tspan>
        </text>

        {/* 3. Status Badge (상태) */}
        <foreignObject
          x="-20"
          y="6"
          width="40"
          height="14"
          style={{ overflow: "visible" }}
        >
          <div
            className={`
            text-[7px] text-white text-center rounded-[2px] 
            py-[2px] leading-none flex items-center justify-center min-w-[40px]
            ${item.status === "표준이상" ? "bg-accent" : "bg-sub400"}
          `}
          >
            {item.status}
          </div>
        </foreignObject>
      </g>
    );
  };

  const maxValue = isMuscle ? 150 : 300;

  return (
    <div className="relative flex-1 w-full min-h-0 flex justify-center items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/img_body.png"
        className="absolute w-28 h-auto pointer-events-none"
        alt="body-bg"
      />
      <div className="w-full h-full z-10">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
            <PolarGrid gridType="polygon" stroke="#DBDBDB" />
            <PolarRadiusAxis
              domain={[0, maxValue]}
              tick={false}
              axisLine={false}
            />
            <Radar
              name="근육량"
              dataKey="lastValue"
              stroke="#7E7E7E"
              fill="#C1C1C1"
              fillOpacity={0.25}
              strokeDasharray="4 4"
            />
            <Radar
              name="근육량"
              dataKey="value"
              stroke="#5B93FF"
              fill="#5B93FF"
              fillOpacity={0.25}
            />
            <PolarAngleAxis
              dataKey="subject"
              // 💡 래핑 함수를 지우고 컴포넌트를 직접 주입하면 타입 추론이 올바르게 맵핑됩니다.
              tick={CustomAngleAxis}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function BodyModel({data} : {data: IBiaData}) {

  const getStatusLabel = (status: number): string => {
    const statusMap: Record<number, string> = {
      0: "표준이하",
      1: "표준",
      2: "표준이상"
    };

    return statusMap[status] ?? "데이터 없음";
  };
  const muscleData = [
    { subject: "복부", 
      value: data.trunk_muscle_ratio, 
      lastValue: data.most_previous_data.trunk_muscle_ratio,
      fullMark: 150, 
      weight: data.trunk_muscle_mass, 
      percent: data.trunk_muscle_ratio + "%", 
      status: getStatusLabel(data.muscle_std_trunk)
    },
    { subject: "왼팔", 
      value: data.left_hand_muscle_ratio, 
      lastValue: data.most_previous_data.left_hand_muscle_ratio,
      fullMark: 150, 
      weight: data.left_hand_muscle_mass, 
      percent: data.left_hand_muscle_ratio + "%", 
      status: getStatusLabel(data.muscle_std_left_hand)
    },
    { subject: "왼다리", 
      value: data.left_foot_muscle_ratio, 
      lastValue: data.most_previous_data.left_foot_muscle_ratio,
      fullMark: 150, 
      weight: data.left_foot_muscle_mass, 
      percent: data.left_foot_muscle_ratio + "%", 
      status: getStatusLabel(data.muscle_std_left_foot) 
    },
    { subject: "오른다리", 
      value: data.right_foot_muscle_ratio, 
      lastValue: data.most_previous_data.right_foot_muscle_ratio,
      fullMark: 150, 
      weight: data.right_foot_muscle_mass, 
      percent: data.right_foot_muscle_ratio + "%", 
      status: getStatusLabel(data.muscle_std_right_foot) 
    },
    { subject: "오른팔", 
      value: data.right_hand_muscle_ratio, 
      lastValue: data.most_previous_data.right_hand_muscle_ratio,
      fullMark: 150, 
      weight: data.right_hand_muscle_mass, 
      percent: data.right_hand_muscle_ratio + "%", 
      status: getStatusLabel(data.muscle_std_right_hand) 
    },
  ];

  const fatData = [
    { subject: "복부", 
      value: data.trunk_fat_percentage, 
      lastValue: data.most_previous_data.trunk_fat_percentage,
      fullMark: 350, 
      weight: data.trunk_fat_mass, 
      percent: data.trunk_fat_percentage + "%", 
      status: getStatusLabel(data.fat_std_trunk)
    },
    { subject: "왼팔", 
      value: data.left_hand_fat_percentage, 
      lastValue: data.most_previous_data.left_hand_fat_percentage,
      fullMark: 300, 
      weight: data.left_hand_fat_mass, 
      percent: data.left_hand_fat_percentage + "%", 
      status: getStatusLabel(data.fat_std_left_hand) 
    },
    { subject: "왼다리", 
      value: data.left_foot_fat_percentage, 
      lastValue: data.most_previous_data.left_foot_fat_percentage,
      fullMark: 300, 
      weight: data.left_foot_fat_mass, 
      percent: data.left_foot_fat_percentage + "%", 
      status: getStatusLabel(data.fat_std_left_foot) 
    },
    { subject: "오른다리", 
      value: data.right_foot_fat_percentage, 
      lastValue: data.most_previous_data.right_foot_fat_percentage,
      fullMark: 300, 
      weight: data.right_foot_fat_mass, 
      percent: data.right_foot_fat_percentage + "%", 
      status: getStatusLabel(data.fat_std_right_foot) 
    },
    { subject: "오른팔", 
      value: data.right_hand_fat_percentage, 
      lastValue: data.most_previous_data.right_hand_fat_percentage,
      fullMark: 300, 
      weight: data.right_hand_fat_mass, 
      percent: data.right_hand_fat_percentage + "%", 
      status: getStatusLabel(data.fat_std_right_hand) 
    },

  ];


  return (
    <div className='grid grid-cols-2 gap-1 w-full h-full'>
      <div className='flex flex-col gap-1 w-full h-full'>
        <div className='flex justify-between '>
          <div className='flex gap-1 pl-1 pt-1 items-center'>
            <div className='w-3 h-3 rounded-[3px] bg-accent' />
            <span className='text-accent font-bold text-sm'>근육 분포</span>
          </div>
        </div>
        
        <PentagonChart data={muscleData} isMuscle={true} />


      </div>

      <div className='flex flex-col gap-1 w-full h-full'>
        <div className='flex justify-between '>
          <div className='flex gap-1 pl-1 pt-1 items-center'>
            <div className='w-3 h-3 rounded-[3px] bg-accent' />
            <span className='text-accent font-bold text-sm'>지방 분포</span>
          </div>
        </div>


        <PentagonChart data={fatData} isMuscle={false} />
      </div>

    </div>
  );
};