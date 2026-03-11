import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface ROMDashboardPartTabProps {
  onSelectBodyPart : (selectedPartNumber: number) => void;
}

export const ROMDashboardPartTab = ({
  onSelectBodyPart
} : ROMDashboardPartTabProps) => {
  const measureTabs = ["목관절", "어깨", "팔꿉", "몸통", "골반", "무릎", "발목"]
  return (
    <div>
      <Tabs>
        <TabsList className="relative z-10 flex w-max min-w-full flex-nowrap items-center justify-start bg-transparent p-0 border-none shadow-none">
        {/* <div className="absolute bottom-0 left-0 w-full h-[3px] bg-sub200 rounded-md" /> */}

        {measureTabs.map((measure, index) => (
          <TabsTrigger
            key={measure}
            value={measure}
            onClick={() => onSelectBodyPart(index + 1)}
            className={cn(
              "relative pb-2 text-lg font-semibold transition-colors whitespace-nowrap flex-shrink-0",
              "bg-transparent data-[state=active]:bg-transparent",
              "shadow-none data-[state=active]:shadow-none",
              "text-sub600 hover:text-sub800 data-[state=active]:text-toggleAccent",
              "after:absolute after:-bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-md",
              "after:bg-sub200 data-[state=active]:after:bg-toggleAccent after:z-10"
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
