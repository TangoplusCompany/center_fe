import React from "react";
import MainDevice from "./_components/MainDevice";
import MainAreaChart from "./_components/MainAreaChart";
import { MainDataTable } from "./_components/MainTable";
import MainUserDonutChart from "./_components/MainUserDonutChart";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <MainDevice className="col-span-12" />
      <Separator className="my-4 col-span-12" />
      <MainAreaChart className="col-span-12 lg:col-span-8 shadow-none rounded-sm" />
      <div className="col-span-12 lg:col-span-4">
        <MainUserDonutChart className="shadow-none rounded-sm h-full" />
      </div>
      <Separator className="my-4 col-span-12" />
      <div className="col-span-12 lg:col-span-6">
        <h2 className="col-span-12 text-xl font-medium pb-2">
          최근 사용자 조회
        </h2>
        <MainDataTable />
      </div>
      <div className="col-span-12 lg:col-span-6">
        <h2 className="col-span-12 text-xl font-medium pb-2">
          신규 사용자 조회
        </h2>
        <MainDataTable />
      </div>
    </div>
  );
}
