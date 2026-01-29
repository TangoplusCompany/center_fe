import ActivityContainer from "@/components/Dashboard/ActivityContainer";
import { DeviceInformation } from "@/components/Dashboard/DeviceInformation";
// import LatestAddUser from "@/components/Dashboard/LatestAddUser";
import LatestMeasureUser from "@/components/Dashboard/LatestMeasureUser";
// import { Separator } from "@/components/ui/separator";
import React from "react";

export default function Home() {
  return (
    <div className="w-full min-w-0 flex flex-col gap-5">
      <ActivityContainer />
      <div className="w-full ">
        {/* <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="w-1 h-10 bg-toggleAccent rounded-full"></div>
            <h2 className="text-2xl col-span-2">최근 등록 사용자 조회</h2>
          </div>
          <LatestAddUser />
        </div> */}

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="w-1 h-10 bg-toggleAccent rounded-full"></div>
            <h2 className="text-2xl col-span-2">최근 측정 조회</h2>
          </div>
          <LatestMeasureUser />
        </div>
      </div>
      <DeviceInformation />
      {/* <Separator className="w-full" /> */}
      
    </div>
  );
}
