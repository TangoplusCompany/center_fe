import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

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
  const t = useTranslations('Index');
  const measureTabs :Record<number, string> = {
    1 : t('neck_joint'), 
    2 : t('part_shoulder'), 
    3 : t('part_elbow'), 
    4: t('upper_body_joint'), 
    5: t('part_hip'), 
    6: t('part_knee'), 
    7: t('part_ankle')
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
                ? "text-mainBlue-600 data-[state=active]:text-mainBlue-600 after:bg-mainBlue-600"
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
