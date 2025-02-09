import { AreaChartComponent } from "@/components/chart/Area";
import React from "react";
import MainDevice from "./_components/MainDevice";

export default function Home() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <MainDevice />
      <AreaChartComponent
        className="col-span-12 shadow-none"
        title="센터 서비스 이용 현황"
        description="센터 사용자들의 서비스 이용 현황을 나타낸 그래프입니다."
      />
    </div>
  );
}
