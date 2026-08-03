import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { GaitContainerProps } from "./Container"
import { Area, AreaChart, CartesianGrid, YAxis } from "recharts";
import { IGaitSeqFrameData } from "@/types/measure";
import { useMemo } from "react";


const DUMMY_FRAMES: IGaitSeqFrameData[] = [
  { sequenceIndex: 0, frameIndex: 6, timestamp: 1.373, headLateralTilt: 178.0, headForwardTilt: 175.7, trunkSway: 178.8, trunkFlexion: 178.4, shoulderTilt: 178.3, leftArmAngle: -176.8, rightArmAngle: -173.1, pelvicDrop: 178.3, leftKneeAngle: 9.7, rightKneeAngle: 54.4 },
  { sequenceIndex: 0, frameIndex: 7, timestamp: 1.406, headLateralTilt: 177.5, headForwardTilt: 159.2, trunkSway: 177.9, trunkFlexion: 177.1, shoulderTilt: 177.5, leftArmAngle: -175.2, rightArmAngle: -171.8, pelvicDrop: 177.8, leftKneeAngle: 12.1, rightKneeAngle: 50.2 },
  { sequenceIndex: 0, frameIndex: 8, timestamp: 1.439, headLateralTilt: 176.8, headForwardTilt: 170.9, trunkSway: 176.5, trunkFlexion: 176.0, shoulderTilt: 176.2, leftArmAngle: -172.9, rightArmAngle: -169.5, pelvicDrop: 176.9, leftKneeAngle: 18.5, rightKneeAngle: 42.1 },
  { sequenceIndex: 0, frameIndex: 9, timestamp: 1.472, headLateralTilt: 177.2, headForwardTilt: 168.5, trunkSway: 177.1, trunkFlexion: 176.8, shoulderTilt: 177.0, leftArmAngle: -174.1, rightArmAngle: -170.8, pelvicDrop: 177.4, leftKneeAngle: 25.3, rightKneeAngle: 33.7 },
  { sequenceIndex: 0, frameIndex: 10, timestamp: 1.505, headLateralTilt: 178.1, headForwardTilt: 176.1, trunkSway: 178.3, trunkFlexion: 178.0, shoulderTilt: 178.1, leftArmAngle: -176.0, rightArmAngle: -172.5, pelvicDrop: 178.1, leftKneeAngle: 31.0, rightKneeAngle: 22.8 },
];

export interface GraphUnit {
  title: string;
  value: number[];
}

export function GaitGraphItem({
  data0,
  data1,
  data2,
}: {
  data0: GraphUnit;
  data1: GraphUnit;
  data2?: GraphUnit;
}) {
  // 1. 최대 프레임 길이에 맞춰 3개 데이터를 하나의 배열로 병합
  const maxLength = Math.max(
    data0.value.length,
    data1.value.length,
    data2?.value.length || 0
  );

  const chartData = Array.from({ length: maxLength }, (_, index) => ({
    frame: index,
    val0: data0.value[index],
    val1: data1.value[index],
    val2: data2?.value[index],
  }));
  const yDomain = useMemo(() => {
    const combinedValues = [...data0.value, ...data1.value, ...(data2?.value || [])].filter(
      (v) => typeof v === "number" && !isNaN(v)
    );

    if (combinedValues.length === 0) return [0, 100];

    const min = Math.min(...combinedValues);
    const max = Math.max(...combinedValues);
    const diff = max - min;
    const padding = diff === 0 ? 10 : diff * 0.15; // 데이터 변화가 없을 시 기본 10 패딩

    return [Math.floor(min - padding), Math.ceil(max + padding)];
  }, [data0, data1, data2]);

  // 2. chartConfig에 각 데이터의 title과 색상 지정
  const chartConfig = {
    val0: {
      label: data0.title,
      color: "#2563EB", // 파랑
    },
    val1: {
      label: data1.title,
      color: "#16A34A", // 초록
    },
    ...(data2 && {
      val2: {
        label: data2.title,
        color: "#DC2626", // 빨강
      },
    }),
  } satisfies ChartConfig;

  return (
    <div className="w-full">
      <ChartContainer config={chartConfig} className="aspect-auto h-[180px] w-full">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="fillVal0" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#2563EB" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="fillVal1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16A34A" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#16A34A" stopOpacity={0.05} />
            </linearGradient>
            {data2 && (
              <linearGradient id="fillVal2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#DC2626" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#DC2626" stopOpacity={0.05} />
              </linearGradient>
            )}
          </defs>
          <YAxis domain={yDomain} hide />
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

          {/* 범례(Legend) 추가 */}
          <ChartLegend content={<ChartLegendContent />} />

          <ChartTooltip
            content={<ChartTooltipContent labelFormatter={(value) => `${value} 프레임`} />}
          />

          {/* Area 3개 배치 */}
          <Area
            dataKey="val0"
            type="monotone"
            fill="url(#fillVal0)"
            stroke="#2563EB"
            strokeWidth={2}
          />
          <Area
            dataKey="val1"
            type="monotone"
            fill="url(#fillVal1)"
            stroke="#16A34A"
            strokeWidth={2}
          />
          {data2 && (
            <Area
              dataKey="val2"
              type="monotone"
              fill="url(#fillVal2)"
              stroke="#DC2626"
              strokeWidth={2}
            />
          )}
        </AreaChart>
      </ChartContainer>
    </div>
  );
}


export default function GaitSeqResult({data}: GaitContainerProps) {
  console.log(data)
  // 2. 프레임 배열을 각 그래프그룹용 GraphUnit 데이터로 추출
  const graphGroups = useMemo(() => {
    return {
      // 1) Head (2개)
      head: {
        data0: { title: "머리 좌우 기울기", value: DUMMY_FRAMES.map((f) => f.headLateralTilt) },
        data1: { title: "머리 전후 기울기", value: DUMMY_FRAMES.map((f) => f.headForwardTilt) },
      },
      // 2) Trunk (2개)
      trunk: {
        data0: { title: "몸통 흔들림", value: DUMMY_FRAMES.map((f) => f.trunkSway) },
        data1: { title: "몸통 굽힘", value: DUMMY_FRAMES.map((f) => f.trunkFlexion) },
      },
      // 3) Shoulder & Arm (3개)
      shoulderArm: {
        data0: { title: "어깨 기울기", value: DUMMY_FRAMES.map((f) => f.shoulderTilt) },
        data1: { title: "왼쪽 팔 각도", value: DUMMY_FRAMES.map((f) => f.leftArmAngle) },
        data2: { title: "오른쪽 팔 각도", value: DUMMY_FRAMES.map((f) => f.rightArmAngle) },
      },
      // 4) Lower Body (3개)
      lowerBody: {
        data0: { title: "골반 틀어짐", value: DUMMY_FRAMES.map((f) => f.pelvicDrop) },
        data1: { title: "왼쪽 무릎 각도", value: DUMMY_FRAMES.map((f) => f.leftKneeAngle) },
        data2: { title: "오른쪽 무릎 각도", value: DUMMY_FRAMES.map((f) => f.rightKneeAngle) },
      },
    };
  }, []);
  return (
    <div className="bg-white rounded-xl border border-sub200 p-4">
      <span className="text-sm sm:text-base font-semibold text-sub700 ">편도 보행 결과</span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full ">
        {/* 1. 머리 관절 */}
        <GaitGraphItem data0={graphGroups.head.data0} data1={graphGroups.head.data1} />

        <GaitGraphItem data0={graphGroups.trunk.data0} data1={graphGroups.trunk.data1} />
        <GaitGraphItem
          data0={graphGroups.shoulderArm.data0}
          data1={graphGroups.shoulderArm.data1}
          data2={graphGroups.shoulderArm.data2}
        />

        <GaitGraphItem
          data0={graphGroups.lowerBody.data0}
          data1={graphGroups.lowerBody.data1}
          data2={graphGroups.lowerBody.data2}
        />
      </div>
    </div>
  );
}