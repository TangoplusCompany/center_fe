import { useMeasureSummaryChartConfig } from "@/hooks/api/measure/useMeasureSummaryChartConfig";
import { FootPressureHistory, UpperAndLowerMeasureHistory } from "@/types/measure";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ChartContainer, ChartTooltip } from "../ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { getRiskString } from "@/utils/getRiskString";

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
  const t = useTranslations("Index");
  const locale = useLocale();
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
    const mapped = data.map(item => {
      let upperScore = 0;
      let lowerScore = 0;
      let footScore = 0;

      // 함수를 거치지 않고 dCase 값으로 직접 분기 처리
      if (dCase === 2) {
        // 족압의 경우 (타입 단언을 통해 item을 FootPressureHistory로 취급)
        const footItem = item as FootPressureHistory;
        footScore = calculateScore(
          footItem.mat_static_risk_level,
          footItem.mat_static_range_level
        );
      } else {
        // 상지/하지의 경우 (UpperAndLowerMeasureHistory로 취급)
        const upperLowerItem = item as UpperAndLowerMeasureHistory;
        upperScore = calculateScore(
          upperLowerItem.risk_upper_risk_level,
          upperLowerItem.risk_upper_range_level
        );
        lowerScore = calculateScore(
          upperLowerItem.risk_lower_risk_level,
          upperLowerItem.risk_lower_range_level
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
      0: t('user_upper_body_trend'),
      1: t('user_lower_body_trend'),
      2: t('user_static_pressure_trend'),
    };
    return levels[dCase] || 'text-black';
  }
  // range_level을 단계로 변환하는 함수
  const getRangeLevelText = (rangeLevel: string) => {
    return `${rangeLevel}${t('unit_grade')}`;
  };

  return (
    <Card className="shadow-none rounded-xl border-2 border-sub200">
      <CardHeader className="p-4 py-2">
        <div className="text-xl font-semibold text-sub700">
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
                            {t('foot_pressure')}: {getRiskString(data.mat_static_risk_level, locale)} {getRangeLevelText(data.mat_static_risk_level)}
                          </span>
                        </div>
                      ) : dCase === 0 ? (
                        // 상지의 경우 - 상체만
                        <div className="flex items-center gap-2 text-sm">
                          <span className={`rounded-full px-2 py-1 ${getTextColor(data.risk_upper_risk_level)}`}>
                            {t('upper_body')}: {getRiskString(data.risk_upper_risk_level, locale)} {getRangeLevelText(data.risk_upper_range_level)}
                          </span>
                        </div>
                      ) : (
                        // 하지의 경우 - 하체만
                        <div className="flex items-center gap-2 text-sm">
                          <span className={`rounded-full px-2 py-1 ${getTextColor(data.risk_lower_risk_level)}`}>
                            {t('lower_body')}: {getRiskString(data.risk_lower_risk_level, locale)} {getRangeLevelText(data.risk_lower_range_level)}
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
                <stop offset="0%" stopColor="#2563EB" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.05} />
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