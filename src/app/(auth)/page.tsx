import { DeviceInformation } from "@/components/Dashboard/DeviceInformation";
import LatestAddUser from "@/components/Dashboard/LatestAddUser";
import LatestMeasureUser from "@/components/Dashboard/LatestMeasureUser";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      <DeviceInformation />
      <Separator className="w-full" />
      <div className="w-full grid grid-cols-2 gap-5">
        <div className="col-span-1 flex flex-col gap-4">
          <h2 className="text-2xl col-span-2">최근 등록 사용자 조회</h2>
          <LatestAddUser />
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <h2 className="text-2xl col-span-2">최근 측정 조회</h2>
          <LatestMeasureUser />
        </div>
      </div>
    </div>
  );
}
