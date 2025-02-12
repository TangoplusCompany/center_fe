import { AreaChartComponent } from "@/components/chart/Area";
import { ChartConfig } from "@/components/ui/chart";
import React from "react";
const chartData: { [key: string]: string | number }[] = [
  { date: "2024-04-01", kiosk: 222, mobile: 150 },
  { date: "2024-04-02", kiosk: 97, mobile: 180 },
  { date: "2024-04-03", kiosk: 167, mobile: 120 },
  { date: "2024-04-04", kiosk: 242, mobile: 260 },
  { date: "2024-04-05", kiosk: 373, mobile: 290 },
  { date: "2024-04-06", kiosk: 301, mobile: 340 },
  { date: "2024-04-07", kiosk: 245, mobile: 180 },
  { date: "2024-04-08", kiosk: 409, mobile: 320 },
  { date: "2024-04-09", kiosk: 59, mobile: 110 },
  { date: "2024-04-10", kiosk: 261, mobile: 190 },
  { date: "2024-04-11", kiosk: 327, mobile: 350 },
  { date: "2024-04-12", kiosk: 292, mobile: 210 },
  { date: "2024-04-13", kiosk: 342, mobile: 380 },
  { date: "2024-04-14", kiosk: 137, mobile: 220 },
  { date: "2024-04-15", kiosk: 120, mobile: 170 },
  { date: "2024-04-16", kiosk: 138, mobile: 190 },
  { date: "2024-04-17", kiosk: 446, mobile: 360 },
  { date: "2024-04-18", kiosk: 364, mobile: 410 },
  { date: "2024-04-19", kiosk: 243, mobile: 180 },
  { date: "2024-04-20", kiosk: 89, mobile: 150 },
  { date: "2024-04-21", kiosk: 137, mobile: 200 },
  { date: "2024-04-22", kiosk: 224, mobile: 170 },
  { date: "2024-04-23", kiosk: 138, mobile: 230 },
  { date: "2024-04-24", kiosk: 387, mobile: 290 },
  { date: "2024-04-25", kiosk: 215, mobile: 250 },
  { date: "2024-04-26", kiosk: 75, mobile: 130 },
  { date: "2024-04-27", kiosk: 383, mobile: 420 },
  { date: "2024-04-28", kiosk: 122, mobile: 180 },
  { date: "2024-04-29", kiosk: 315, mobile: 240 },
  { date: "2024-04-30", kiosk: 454, mobile: 380 },
  { date: "2024-05-01", kiosk: 165, mobile: 220 },
  { date: "2024-05-02", kiosk: 293, mobile: 310 },
  { date: "2024-05-03", kiosk: 247, mobile: 190 },
  { date: "2024-05-04", kiosk: 385, mobile: 420 },
  { date: "2024-05-05", kiosk: 481, mobile: 390 },
  { date: "2024-05-06", kiosk: 498, mobile: 520 },
  { date: "2024-05-07", kiosk: 388, mobile: 300 },
  { date: "2024-05-08", kiosk: 149, mobile: 210 },
  { date: "2024-05-09", kiosk: 227, mobile: 180 },
  { date: "2024-05-10", kiosk: 293, mobile: 330 },
  { date: "2024-05-11", kiosk: 335, mobile: 270 },
  { date: "2024-05-12", kiosk: 197, mobile: 240 },
  { date: "2024-05-13", kiosk: 197, mobile: 160 },
  { date: "2024-05-14", kiosk: 448, mobile: 490 },
  { date: "2024-05-15", kiosk: 473, mobile: 380 },
  { date: "2024-05-16", kiosk: 338, mobile: 400 },
  { date: "2024-05-17", kiosk: 499, mobile: 420 },
  { date: "2024-05-18", kiosk: 315, mobile: 350 },
  { date: "2024-05-19", kiosk: 235, mobile: 180 },
  { date: "2024-05-20", kiosk: 177, mobile: 230 },
  { date: "2024-05-21", kiosk: 82, mobile: 140 },
  { date: "2024-05-22", kiosk: 81, mobile: 120 },
  { date: "2024-05-23", kiosk: 252, mobile: 290 },
  { date: "2024-05-24", kiosk: 294, mobile: 220 },
  { date: "2024-05-25", kiosk: 201, mobile: 250 },
  { date: "2024-05-26", kiosk: 213, mobile: 170 },
  { date: "2024-05-27", kiosk: 420, mobile: 460 },
  { date: "2024-05-28", kiosk: 233, mobile: 190 },
  { date: "2024-05-29", kiosk: 78, mobile: 130 },
  { date: "2024-05-30", kiosk: 340, mobile: 280 },
  { date: "2024-05-31", kiosk: 178, mobile: 230 },
  { date: "2024-06-01", kiosk: 178, mobile: 200 },
  { date: "2024-06-02", kiosk: 470, mobile: 410 },
  { date: "2024-06-03", kiosk: 103, mobile: 160 },
  { date: "2024-06-04", kiosk: 439, mobile: 380 },
  { date: "2024-06-05", kiosk: 88, mobile: 140 },
  { date: "2024-06-06", kiosk: 294, mobile: 250 },
  { date: "2024-06-07", kiosk: 323, mobile: 370 },
  { date: "2024-06-08", kiosk: 385, mobile: 320 },
  { date: "2024-06-09", kiosk: 438, mobile: 480 },
  { date: "2024-06-10", kiosk: 155, mobile: 200 },
  { date: "2024-06-11", kiosk: 92, mobile: 150 },
  { date: "2024-06-12", kiosk: 492, mobile: 420 },
  { date: "2024-06-13", kiosk: 81, mobile: 130 },
  { date: "2024-06-14", kiosk: 426, mobile: 380 },
  { date: "2024-06-15", kiosk: 307, mobile: 350 },
  { date: "2024-06-16", kiosk: 371, mobile: 310 },
  { date: "2024-06-17", kiosk: 475, mobile: 520 },
  { date: "2024-06-18", kiosk: 107, mobile: 170 },
  { date: "2024-06-19", kiosk: 341, mobile: 290 },
  { date: "2024-06-20", kiosk: 408, mobile: 450 },
  { date: "2024-06-21", kiosk: 169, mobile: 210 },
  { date: "2024-06-22", kiosk: 317, mobile: 270 },
  { date: "2024-06-23", kiosk: 480, mobile: 530 },
  { date: "2024-06-24", kiosk: 132, mobile: 180 },
  { date: "2024-06-25", kiosk: 141, mobile: 190 },
  { date: "2024-06-26", kiosk: 434, mobile: 380 },
  { date: "2024-06-27", kiosk: 448, mobile: 490 },
  { date: "2024-06-28", kiosk: 149, mobile: 200 },
  { date: "2024-06-29", kiosk: 103, mobile: 160 },
  { date: "2024-06-30", kiosk: 446, mobile: 400 },
];

const chartConfig = {
  kiosk: {
    label: "Kiosk",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const MainAreaChart = () => {
  return (
    <AreaChartComponent
      title="센터 서비스 이용 현황"
      description="센터 사용자들의 서비스 이용 현황 그래프 입니다."
      config={chartConfig}
      data={chartData}
      className="col-span-12 shadow-none rounded-sm"
    />
  );
};

export default MainAreaChart;
