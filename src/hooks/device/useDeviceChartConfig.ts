import { IDeviceStatusCardProps } from "@/types/device";
import { useEffect, useState } from "react";

type ChartConfigValue = {
  label: string;
  color: string;
};

type ChartConfig = Record<string, ChartConfigValue>;

function getRandomHexColor() {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16);
  return `#${hex.padStart(6, "0")}`;
}

export const useDeviceChartConfig = (devices: IDeviceStatusCardProps[] = []) => {
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});

  useEffect(() => {
    if (!devices || devices.length === 0) return;

    const newConfig: ChartConfig = {};

    devices.forEach((device) => {
      const name = device.device_name;
      if (!newConfig[name]) {
        newConfig[name] = {
          label: name,
          color: getRandomHexColor(),
        };
      }
    });

    setChartConfig(newConfig);
  }, [devices]);

  return { chartConfig, setChartConfig };
};
