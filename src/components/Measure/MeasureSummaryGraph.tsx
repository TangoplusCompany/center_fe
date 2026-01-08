import { useMeasureSummaryChartConfig } from "@/hooks/api/measure/useMeasureSummaryChartConfig";
import { FootPressureHistory, UpperAndLowerMeasureHistory } from "@/types/measure";
import { Card, CardContent } from "../ui/card";
import { ChartContainer, ChartLegend, ChartTooltip } from "../ui/chart";
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
    if (point && point.sn) {
      legendClick(point.sn);
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

    return data.map(item => {
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
        upper: upperScore,  // 👈 이 필드명들이 중요!
        lower: lowerScore,  // 👈 Area의 dataKey와 일치해야 함
        foot: footScore
      };
    });
  }, [data, dCase]);
  const yAxisTicks = [4, 7, 10];

  // y축 라벨 포맷터
  const formatYAxis = (value: number) => {
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
  

  // range_level을 단계로 변환하는 함수
  const getRangeLevelText = (rangeLevel: string) => {
    return `${rangeLevel}단계`;
  };

  return (
    <Card className="shadow-none border-white">
      {/* <CardHeader className="flex items-center gap-2 space-y-0 border-2 border-toggleAccent-background py-2 sm:flex-row bg-toggleAccent-background">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle className="text-toggleAccent text-xl">상지·하지 요약 추이</CardTitle>
        </div>
      </CardHeader> */}
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
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
            <CartesianGrid vertical={false} />
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
              domain={[0, 10]}
              ticks={yAxisTicks}
              tickFormatter={formatYAxis}
              tickLine={false}
              axisLine={false}
            />
            
            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null;
                
                const data = payload[0].payload;
                
                return (
                  <div className="rounded-lg border bg-background p-3 shadow-sm">
                    <div className="text-sm font-medium mb-2">
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
            
            <ChartLegend
              content={() => {
                return (
                  <div className="flex justify-center items-center gap-3 pt-2">
                    {data.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => legendClick(item.sn)}
                        className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity cursor-pointer"
                      >
                        
                        <span>✔ {item.measure_date.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                );
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default MeasureSummaryGraph;