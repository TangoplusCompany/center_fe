import React from "react";
import MainDevice from "./_components/MainDevice";
import MainAreaChart from "./_components/MainAreaChart";

export default function Home() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <MainDevice />
      <MainAreaChart />
    </div>
  );
}
