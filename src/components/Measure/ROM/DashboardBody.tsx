import ROMDashboardPartList from "./DashboardPartList";
import { ROMDashboardPartTab } from "./DashboardPartTab";
import DashboardTypeContainer from "./DashboardTypeContainer";
import { IMeasureROMHistoryItem, IMeasureROMTypeItem } from "@/types/measure";
import { ComparePair } from "@/types/compare";

export interface ROMDashboardBodyProps {
  bodyPart: number;
  onSelectBodyPart: (selectedPartNumber: number) => void;
  measureType: number;
  setMeasureType: (selectedMeasureType: number) => void;
  romTypeItems: IMeasureROMTypeItem[];
  onROMItemSelect ?: (romSn: ComparePair) => void;
  romHistory : IMeasureROMHistoryItem[]
}

const ROMDashboardBody = ({
  bodyPart,
  onSelectBodyPart,
  measureType, 
  setMeasureType,
  romTypeItems,
  onROMItemSelect,
  romHistory,

} : ROMDashboardBodyProps) => {
  return (
    <div className="flex flex-col gap-4">
      <ROMDashboardPartTab onSelectBodyPart={onSelectBodyPart} currentBodyPart={bodyPart} setMeasureType={setMeasureType} />
      <ROMDashboardPartList romTypeItems={romTypeItems} setMeasureType={setMeasureType}   />

      {(measureType !== -1) && (
        <DashboardTypeContainer romHistorys={romHistory ?? []} onROMItemSelect={onROMItemSelect} />
      )}
    </div>
  );
}

export default ROMDashboardBody;