import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";
import ROMDashboardContainer from "../Measure/ROM/DashboardContainer";
import CenterUserNormalDashBoard from "./NormalDashBoard";

export interface CenterUserDashboardContainerProps {
  userSn: number;
  isMyPage: boolean;
}

type DashboardViewType = "normal" | "rom";

const CenterUserDashboardContainer = ({
  userSn,
  isMyPage
}: CenterUserDashboardContainerProps) => {
  const [currentViewType, setCurrentViewType] = useState<DashboardViewType>("normal")
  
  const dashboardTabs: Record<number, string> = {
    0: "기본 검사",
    1: "ROM 검사"
  }

  // ✅ index → DashboardViewType 매핑
  const viewTypeMap: Record<number, DashboardViewType> = {
    0: "normal",
    1: "rom"
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto overflow-y-hidden w-full min-w-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <Tabs>
          <TabsList className="relative z-10 flex w-max min-w-full flex-nowrap items-center justify-start bg-transparent p-0 border-none shadow-none">
            {Object.entries(dashboardTabs).map(([index, dashboard]) => (
              <TabsTrigger
                key={dashboard}
                value={dashboard}
                onClick={() => {
                  setCurrentViewType(viewTypeMap[Number(index)]) // ✅ 수정
                }}
                className={cn(
                  "relative pb-2 text-lg font-semibold transition-colors whitespace-nowrap flex-shrink-0",
                  "bg-transparent data-[state=active]:bg-transparent",
                  "shadow-none data-[state=active]:shadow-none",
                  "after:absolute after:-bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-md",
                  "after:z-10",
                  currentViewType === viewTypeMap[Number(index)] // ✅ currentBodyPart → currentViewType
                    ? "text-toggleAccent data-[state=active]:text-toggleAccent after:bg-toggleAccent"
                    : "text-sub600 hover:text-sub800 data-[state=active]:text-sub600 after:bg-sub200"
                )}
              >
                {dashboard} {/* ✅ dash] → dashboard */}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      { currentViewType === "normal" ? 
        (<CenterUserNormalDashBoard userSn={userSn} isMyPage={isMyPage} />) :
        (<ROMDashboardContainer userSn={userSn} isMyPage={isMyPage} /> )
      }
    </div>
  )
};

export default CenterUserDashboardContainer