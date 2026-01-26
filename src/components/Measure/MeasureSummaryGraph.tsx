import { useMeasureSummaryChartConfig } from "@/hooks/api/measure/useMeasureSummaryChartConfig";
import { FootPressureHistory, UpperAndLowerMeasureHistory } from "@/types/measure";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ChartContainer, ChartTooltip } from "../ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import React from "react";

type MeasureSummaryGraphProps = 
  | {
      dCase: 0 | 1;
      data: UpperAndLowerMeasureHistory[];
      legendClick: (sn: number) => void;
    }
  | {
      dCase: 2;
      data: FootPressureHistory[];
      legendClick: (sn: number) => void;
    };
const MeasureSummaryGraph = ({
  data,
  legendClick,
  dCase,
}: MeasureSummaryGraphProps) => {

  const { chartConfig } = useMeasureSummaryChartConfig(data);

  // 데이터 포인트 클릭 핸들러
  const handleAreaClick = (
    point: UpperAndLowerMeasureHistory | FootPressureHistory
  ) => {
    // measure_sn으로 통일됨
    if (point && point.measure_sn) {
      legendClick(point.measure_sn);
    }
  };

  const calculateScore = (riskLevel: string, rangeLevel: string) => {
    const risk = parseInt(riskLevel);
    const range = parseInt(rangeLevel);
    return risk * 3 + range;
  };
  const processedData = React.useMemo(() => {
    const isFootPressureHistory = (
      item: UpperAndLowerMeasureHistory | FootPressureHistory
    ): item is FootPressureHistory => {
      return dCase === 2;
    };

    const mapped = data.map(item => {
      let upperScore = 0;
      let lowerScore = 0;
      let footScore = 0;
      if (isFootPressureHistory(item)) {
        // 족압의 경우
        footScore = calculateScore(
          item.mat_static_risk_level,
          item.mat_static_range_level
        );
        lowerScore = 0; // 또는 족압의 다른 값
      } else {
        // 상지/하지의 경우
        upperScore = calculateScore(
          item.risk_upper_risk_level,
          item.risk_upper_range_level
        );
        lowerScore = calculateScore(
          item.risk_lower_risk_level,
          item.risk_lower_range_level
        );
      }

      return {
        ...item,
        date: item.measure_date,
        upper: upperScore,
        lower: lowerScore,
        foot: footScore
      };
    });

    // 날짜 기준 오름차순 정렬 (가장 오래된 것 → 가장 최근 것)
    return mapped.sort((a, b) => {
      return new Date(a.measure_date).getTime() - new Date(b.measure_date).getTime();
    });
  }, [data, dCase]);

  const yAxisTicks = [1, 4, 7];

  // y축 라벨 포맷터
  const formatYAxis = (value: number) => {
    if (value <= 1) return '정상';
    if (value <= 4) return '주의'; // 정상은 생략
    if (value <= 7) return '위험';
    return '';
  };

  const getRiskLevelText = (riskLevel: string) => {
    const levels: { [key: string]: string } = {
      '0': '정상',
      '1': '주의',
      '2': '위험'
    };
    return levels[riskLevel] || '알 수 없음';
  };

  const getTextColor = (riskLevel: number) => {
    const levels: { [key: string]: string } = {
      '0': "text-secondary",
      '1': "text-warning",
      '2': "text-danger",
    };
    return levels[riskLevel] || 'text-black';
  }
  
  const getTitle = (dCase: 0 | 1 | 2) => {
    const levels: { [key: string]: string } = {
      0: "상지 기간별 추이",
      1: "하지 기간별 추이",
      2: "정적 족압 기간별 추이",
    };
    return levels[dCase] || 'text-black';
  }
  // range_level을 단계로 변환하는 함수
  const getRangeLevelText = (rangeLevel: string) => {
    return `${rangeLevel}단계`;
  };

  return (
    <Card className="shadow-none rounded-xl border-2 border-sub200">
      <CardHeader className="p-4 py-2">
        <div className="text-xl font-semibold text-sub800">
          {getTitle(dCase)}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[256px] w-full"
        >
          <AreaChart 
            data={processedData}
            onClick={(e) => {
              // 차트의 activePayload에서 클릭된 데이터 가져오기
              if (e && e.activePayload && e.activePayload[0]) {
                const clickedData = e.activePayload[0].payload;
                handleAreaClick(clickedData);
              }
            }}
          >
            <CartesianGrid 
              vertical={false} 
              stroke="hsl(var(--sub200))"
              strokeDasharray="4 4"
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("ko-KR", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis
              domain={[1, 9]}
              ticks={yAxisTicks}
              tickFormatter={formatYAxis}
              tickSize={20}
              tickLine={false}
              axisLine={false}
              width={40}
            />
            
            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null;
                
                const data = payload[0].payload;
                
                return (
                  <div className="rounded-lg border p-3 shadow-sm bg-white">
                    <div className="text-base font-medium mb-2">
                      {data.measure_date.split(' ')[0]}
                    </div>
                    <div className="space-y-1">
                      {dCase === 2 ? (
                        // 족압의 경우
                        <div className="flex items-center gap-2 text-sm">
                          <span className={`rounded-full px-2 py-1 ${getTextColor(data.mat_static_risk_level)}`}>
                            족압: {getRiskLevelText(data.mat_static_risk_level)} {getRangeLevelText(data.mat_static_risk_level)}
                          </span>
                        </div>
                      ) : dCase === 0 ? (
                        // 상지의 경우 - 상체만
                        <div className="flex items-center gap-2 text-sm">
                          <span className={`rounded-full px-2 py-1 ${getTextColor(data.risk_upper_risk_level)}`}>
                            상지: {getRiskLevelText(data.risk_upper_risk_level)} {getRangeLevelText(data.risk_upper_range_level)}
                          </span>
                        </div>
                      ) : (
                        // 하지의 경우 - 하체만
                        <div className="flex items-center gap-2 text-sm">
                          <span className={`rounded-full px-2 py-1 ${getTextColor(data.risk_lower_risk_level)}`}>
                            하지: {getRiskLevelText(data.risk_lower_risk_level)} {getRangeLevelText(data.risk_lower_range_level)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }}
            />
            <defs>
              <linearGradient id="fill-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--toggle-accent))" stopOpacity={0.6} />
                <stop offset="100%" stopColor="white" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            {/* Area 컴포넌트들 - seriesKeys를 기반으로 생성 */}
            {dCase === 0 && (
              <Area
                type="monotone"
                dataKey="upper"
                stroke="hsl(220, 70%, 50%)"
                fill="url(#fill-gradient)"
                fillOpacity={0.4}
                strokeWidth={2}
                cursor="pointer"
                name="상체"
              />
            )}
            {dCase === 1 && (
              <Area
                type="monotone"
                dataKey="lower"
                stroke="hsl(220, 70%, 50%)"
                fill="url(#fill-gradient)"
                fillOpacity={0.4}
                strokeWidth={2}
                cursor="pointer"
                name="하체"
              />
            )}
            {dCase === 2 && (
              <Area
                type="monotone"
                dataKey="foot"
                stroke="hsl(220, 70%, 50%)"
                fill="url(#fill-gradient)"
                fillOpacity={0.4}
                strokeWidth={2}
                cursor="pointer"
                name="하체"
              />
            )}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default MeasureSummaryGraph;