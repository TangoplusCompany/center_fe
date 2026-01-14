import { ChartConfigValue } from "@/hooks/device/useDeviceChartConfig";
import { FootPressureHistory, UpperAndLowerMeasureHistory } from "@/types/measure";
import { RandomHexColor } from "@/utils/randomHexColor";
import { useEffect, useState } from "react";

type ChartConfig = Record<string, ChartConfigValue>;

/**
 * 센터 기기 차트 설정 Hooks
 * @param devices 기기 상태 카드 데이터
 * @returns 센터 기기 차트 설정
 */
export const useMeasureSummaryChartConfig = (
  summarys: UpperAndLowerMeasureHistory[] | FootPressureHistory[] = [],
) => {
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});

  useEffect(() => {
    if (!summarys || summarys.length === 0) return;

    const newConfig: ChartConfig = {};

    summarys.forEach((summary) => {
      const name = summary.measure_date;
      if (!newConfig[name]) {
        newConfig[name] = {
          label: name,
          color: RandomHexColor(),
        };
      }
    });

    setChartConfig(newConfig);
  }, [summarys]);

  return { chartConfig, setChartConfig };
};