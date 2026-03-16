import { CompareSlot } from "@/types/compare";
import { IMeasureROMItemDetail } from "@/types/measure";



export const ROMRawDataUnit = ({
  data,
  onCompareDialogOpen,
  compareSlot
}: {
  data?: IMeasureROMItemDetail,
  onCompareDialogOpen: (slot: CompareSlot, selectedMeasureType?: number) => void;
  compareSlot: 0 | 1
}) => {
  const romStateMap : Record<number, string> = {
    0: "위험",
    1: "주의",
    2: "정상",
    3: "매우 양호"
  };
  const romState = data && (romStateMap[data.score] ?? "정상");
  const romValue = data && (Math.abs(data?.value_1_max).toFixed(1));
  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div>
        <div className="flex flex-col border-b-2 border-sub200 dark:bodrer bg-sub100 dark:bg-muted">
          
          <div className="flex justify-between p-2">
            <div className="text-base font-semibold">{data?.title}</div>
            <div 
              className="text-sm text-toggleAccent px-2 py-1 rounded-full border-2 border-toggleAccent bg-toggleAccent-background cursor-pointer hover:border-toggleAccent/80 transition-colors" 
              onClick={() => onCompareDialogOpen(compareSlot, data?.measure_type)} 
              >이전 기록과 비교</div>
          </div>
          
          <div className="grid grid-cols-[25%_25%_50%] items-center divide-x-2 divide-sub200">
            <div className="h-full flex items-center justify-center py-2 ">최대 각도</div>
            <div className="h-full flex items-center justify-center py-2 ">단계</div>
            <div className="h-full flex py-2 pl-2">설명</div>
          </div>
          
        </div>

        <div className="grid grid-cols-[25%_25%_50%] items-center dark:border dark:bg-muted divide-x-2 divide-sub200">
          <div className="h-full flex items-center justify-center">{romValue}º</div>
          <div className="h-full flex items-center justify-center">{romState}</div>
          <div className="h-full flex items-center px-2 py-1">{data?.description}</div>
        </div>
      </div>
    </div>
  );
};

export default ROMRawDataUnit;