import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface ROMDashboardPartTabProps {
  onSelectBodyPart : (selectedPartNumber: number) => void;
  currentBodyPart: number;
  setMeasureType: (selectedMeasureType: number) => void; // 탭을 누를시 하단에 detaillist초기화
}

export const ROMDashboardPartTab = ({
  onSelectBodyPart,
  currentBodyPart,
  setMeasureType,
} : ROMDashboardPartTabProps) => {
  const measureTabs :Record<number, string> = {
    1 : "목관절", 
    2 : "어깨", 
    3 : "팔꿉", 
    4: "몸통", 
    5: "골반", 
    6: "무릎", 
    7: "발목"
  }
  return (
    <div className="overflow-x-auto overflow-y-hidden w-full min-w-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <Tabs>
        <TabsList className="relative z-10 flex w-max min-w-full flex-nowrap items-center justify-start bg-transparent p-0 border-none shadow-none">
        {/* <div className="absolute bottom-0 left-0 w-full h-[3px] bg-sub200 rounded-md" /> */}

        {Object.entries(measureTabs).map(([index, measure]) => (
          <TabsTrigger
            key={measure}
            value={measure}
            onClick={() => 
              {
                console.log(index)
                onSelectBodyPart(Number(index))
                setMeasureType(-1)
              }
            }
            className={cn(
              "relative pb-2 text-lg font-semibold transition-colors whitespace-nowrap flex-shrink-0",
              "bg-transparent data-[state=active]:bg-transparent",
              "shadow-none data-[state=active]:shadow-none",
              "after:absolute after:-bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-md",
              "after:z-10",
              currentBodyPart === Number(index)
                ? "text-toggleAccent data-[state=active]:text-toggleAccent after:bg-toggleAccent"
                : "text-sub600 hover:text-sub800 data-[state=active]:text-sub600 after:bg-sub200"
            )}
          >
            {measure}
          </TabsTrigger>
        ))}
      </TabsList>
      </Tabs>
    </div>
  );
}
