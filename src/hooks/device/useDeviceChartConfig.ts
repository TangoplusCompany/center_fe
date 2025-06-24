import { IDeviceStatusCardProps } from "@/types/device";
import { RandomHexColor } from "@/utils/RandomHexColor";
import { useEffect, useState } from "react";

type ChartConfigValue = {
  label: string;
  color: string;
};

type ChartConfig = Record<string, ChartConfigValue>;

/**
 * 센터 기기 차트 설정 Hooks
 * @param devices 기기 상태 카드 데이터
 * @returns 센터 기기 차트 설정
 */
export const useDeviceChartConfig = (
  devices: IDeviceStatusCardProps[] = [],
) => {
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});

  useEffect(() => {
    if (!devices || devices.length === 0) return;

    const newConfig: ChartConfig = {};

    devices.forEach((device) => {
      const name = device.device_name;
      if (!newConfig[name]) {
        newConfig[name] = {
          label: name,
          color: RandomHexColor(),
        };
      }
    });

    setChartConfig(newConfig);
  }, [devices]);

  return { chartConfig, setChartConfig };
};
