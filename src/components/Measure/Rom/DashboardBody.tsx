import ROMDashboardPartList from "./DashboardPartList";
import { IMeasureROMHistoryItem, IMeasureROMTypeItem } from "@/types/measure";
import { ComparePair } from "@/types/compare";

export interface ROMDashboardBodyProps {
  measureType: number;
  setMeasureType: (selectedMeasureType: number) => void;
  romTypeItems: IMeasureROMTypeItem[];
  onROMItemSelect ?: (romSn: ComparePair) => void;
  romHistory : IMeasureROMHistoryItem[],
}

const ROMDashboardBody = ({
  measureType, 
  setMeasureType,
  romTypeItems,
  onROMItemSelect,
  romHistory,
} : ROMDashboardBodyProps) => {
  return (
    <div className="flex flex-col gap-4">
      <ROMDashboardPartList 
        romTypeItems={romTypeItems} 
        measureType={measureType}  
        setMeasureType={setMeasureType} 
        romHistorys={romHistory ?? []} 
        onROMItemSelect={onROMItemSelect}
      />
    </div>
  );
}

export default ROMDashboardBody;