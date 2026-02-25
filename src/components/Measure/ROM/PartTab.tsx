import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ComparePair } from "@/types/compare";
import {  useState } from "react";

export interface ROMSelectProps {
  onPartSelect?: (part: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) => void;
  onROMItemSelect?: (ronSn: number | undefined, isLeft: boolean) => void;
  romPair: ComparePair;
}

type ROMPart = {
  title: string;
  value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  // 이 부분에 ROM 결과목록을 받아와야 함.
  // render: (left?: IUserMeasureInfoResponse, right?: IUserMeasureInfoResponse) => React.ReactNode; 
};
export const ROMPartTab = ({
  onPartSelect,
  onROMItemSelect,
  
} : ROMSelectProps) => {
  const [activeIdx, setActiveIdx] = useState(0);
  // const prevActiveIdxRef = useRef(activeIdx); // ✅ 이전 activeIdx 추적
  
  const partTabs: ROMPart[] = [
    {
      title: "목관절",
      value: 1,
    },
    {
      title: "어깨",
      value: 2,
    },
    {
      title: "팔꿈치",
      value: 3,
    },
    {
      title: "몸통",
      value: 4,
    },
    {
      title: "골반",
      value: 5,
    },
    {
      title: "무릎",
      value: 6,
    },
    {
      title: "발목",
      value: 7
    },
    
  ]
  const activeValue = partTabs[activeIdx].value;
  // useEffect(() => {
  //   // ✅ 탭이 실제로 변경되었을 때만 처리
  //   if (prevActiveIdxRef.current !== activeIdx) {
  //     if (onPartSelect) {
  //       onPartSelect(activeValue);
  //     }
      
  //     // ✅ ROM 상세보기 중이었다면 선택창으로 복귀
  //     if (romSn !== undefined && romSn !== -1 && onROMItemSelect) {
  //       onROMItemSelect(-1);
  //     }
      
  //     prevActiveIdxRef.current = activeIdx; // 현재 값 저장
  //   }
  // }, [activeIdx, activeValue, onPartSelect, romSn, onROMItemSelect]);
  
  return (
    <div>
      <Tabs
        value={`${activeValue}`}
        onValueChange={(value) => {
          const idx = partTabs.findIndex((m) => m.value === parseInt(value));
          if (idx >= 0 && idx !== activeIdx) {
            setActiveIdx(idx);
            const newValue = partTabs[idx].value;
            
            if (onPartSelect) onPartSelect(newValue);
          }
          if (onROMItemSelect) {
            onROMItemSelect(undefined, true);
            onROMItemSelect(undefined, false);
          }
        }}
        className="w-full table table-fixed min-w-0"
      >
        <div className="w-full">
          <div className="overflow-x-auto overflow-y-hidden w-full min-w-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            
            <TabsList className="relative z-10 flex w-max min-w-full flex-nowrap items-center justify-start bg-transparent p-0 border-none shadow-none">

              {partTabs.map((measure) => (
                <TabsTrigger
                  key={measure.value}
                  value={`${measure.value}`}
                  className={cn(
                    "relative pb-2 text-lg font-semibold transition-colors whitespace-nowrap flex-shrink-0",
                    "bg-transparent data-[state=active]:bg-transparent",
                    "shadow-none data-[state=active]:shadow-none",
                    "text-sub300 hover:text-secondary data-[state=active]:text-toggleAccent",
                    "after:absolute after:-bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-md",
                    "after:bg-sub200 data-[state=active]:after:bg-toggleAccent after:z-10"
                  )}
                >
                  {measure.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default ROMPartTab;