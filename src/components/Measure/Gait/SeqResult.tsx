// src/components/gait/GaitSeqResult.tsx (컴포넌트 파일 경로)
"use client";

import { useMemo, useState, useId } from "react";
import { Area, AreaChart, CartesianGrid, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { GaitContainerProps } from "./Container";
import { IGaitSeqFrameData } from "@/types/measure";

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
  const uniqueId = useId().replace(/:/g, "");
  
  // 단일 선택 상태 (null일 때는 아무것도 선택 안 됨 = 기본 상태)
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const toggleKey = (key: string) => {
    setSelectedKey((prev) => (prev === key ? null : key));
  };

  const DEFAULT_COLORS: Record<string, string> = {
    val0: "#5B93FFCC",
    val1: "#2563EBE6",
    val2: "#1E40AF",
  };

  // 💡 색상 결정 로직:
  // 선택된 게 없으면(null) -> 각자 기본 색상
  // 하나라도 선택되면 -> 선택된 항목만 기본 색상, 나머지는 #BBBBBB
  const getColor = (key: string) => {
    if (!selectedKey) return DEFAULT_COLORS[key];
    return selectedKey === key ? DEFAULT_COLORS[key] : "#BBBBBB";
  };

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
    const padding = diff === 0 ? 10 : diff * 0.15;

    return [Math.floor(min - padding), Math.ceil(max + padding)];
  }, [data0, data1, data2]);

  const chartConfig = {
    val0: { label: data0.title, color: getColor("val0") },
    val1: { label: data1.title, color: getColor("val1") },
    ...(data2 && { val2: { label: data2.title, color: getColor("val2") } }),
  } satisfies ChartConfig;

  const legendList = [
    { key: "val0", title: data0.title },
    { key: "val1", title: data1.title },
    ...(data2 ? [{ key: "val2", title: data2.title }] : []),
  ];

  return (
    <div className="w-full space-y-2">
      {/* 범례 영역 */}
      <div className="flex justify-end gap-3 text-xs font-medium pr-2">
        {legendList.map((item) => {
          const color = getColor(item.key);
          const isActive = !selectedKey || selectedKey === item.key;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => toggleKey(item.key)}
              className="flex items-center gap-1.5 cursor-pointer transition-opacity hover:opacity-80"
            >
              <span
                className="w-3 h-3 rounded-sm rounded-xs transition-colors"
                style={{ backgroundColor: color }}
              />
              <span className={isActive ? "text-gray-900 font-bold" : "text-gray-400"}>
                {item.title}
              </span>
            </button>
          );
        })}
      </div>

      <ChartContainer config={chartConfig} className="aspect-auto h-[180px] w-full">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id={`fillVal0-${uniqueId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={getColor("val0")} stopOpacity={0.4} />
              <stop offset="100%" stopColor={getColor("val0")} stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id={`fillVal1-${uniqueId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={getColor("val1")} stopOpacity={0.4} />
              <stop offset="100%" stopColor={getColor("val1")} stopOpacity={0.05} />
            </linearGradient>
            {data2 && (
              <linearGradient id={`fillVal2-${uniqueId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={getColor("val2")} stopOpacity={0.4} />
                <stop offset="100%" stopColor={getColor("val2")} stopOpacity={0.05} />
              </linearGradient>
            )}
          </defs>

          <YAxis domain={yDomain} hide />
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

          <ChartTooltip
            content={<ChartTooltipContent labelFormatter={(value) => `${value} 프레임`} />}
          />

          <Area
            dataKey="val0"
            type="monotone"
            fill={`url(#fillVal0-${uniqueId})`}
            stroke={getColor("val0")}
            strokeWidth={2}
          />
          <Area
            dataKey="val1"
            type="monotone"
            fill={`url(#fillVal1-${uniqueId})`}
            stroke={getColor("val1")}
            strokeWidth={2}
          />
          {data2 && (
            <Area
              dataKey="val2"
              type="monotone"
              fill={`url(#fillVal2-${uniqueId})`}
              stroke={getColor("val2")}
              strokeWidth={2}
            />
          )}
        </AreaChart>
      </ChartContainer>
    </div>
  );
}

export default function GaitSeqResult({ data }: GaitContainerProps) {
  console.log(data);

  const graphGroups = useMemo(() => {
    return {
      head: {
        data0: { title: "머리 좌우 기울기", value: DUMMY_FRAMES.map((f) => f.headLateralTilt) },
        data1: { title: "머리 전후 기울기", value: DUMMY_FRAMES.map((f) => f.headForwardTilt) },
      },
      trunk: {
        data0: { title: "몸통 흔들림", value: DUMMY_FRAMES.map((f) => f.trunkSway) },
        data1: { title: "몸통 굽힘", value: DUMMY_FRAMES.map((f) => f.trunkFlexion) },
      },
      shoulderArm: {
        data0: { title: "어깨 기울기", value: DUMMY_FRAMES.map((f) => f.shoulderTilt) },
        data1: { title: "왼쪽 팔 각도", value: DUMMY_FRAMES.map((f) => f.leftArmAngle) },
        data2: { title: "오른쪽 팔 각도", value: DUMMY_FRAMES.map((f) => f.rightArmAngle) },
      },
      lowerBody: {
        data0: { title: "골반 틀어짐", value: DUMMY_FRAMES.map((f) => f.pelvicDrop) },
        data1: { title: "왼쪽 무릎 각도", value: DUMMY_FRAMES.map((f) => f.leftKneeAngle) },
        data2: { title: "오른쪽 무릎 각도", value: DUMMY_FRAMES.map((f) => f.rightKneeAngle) },
      },
    };
  }, []);

  return (
    <div className="bg-white rounded-xl border border-sub200 p-4">
      <div className="text-lg font-semibold mb-2 text-sub700">편도 보행 결과</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
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