import { IMeasureROMHistoryItem } from "@/types/measure";
import { ROMDashboardTypeInfo } from "./DashboardTypeInfo";
import ROMDashboardTypeList from "./DashboardTypeList";
import { ComparePair } from "@/types/compare";

export interface ROMDashboardTypeContainerProps {
  romHistorys: IMeasureROMHistoryItem[]
  onROMItemSelect ?: (romSn: ComparePair) => void;
}


const ROMDashboardTypeContainer = ({
  romHistorys,
  onROMItemSelect
}: ROMDashboardTypeContainerProps) => {
  return (
    <div className="flex flex-col gap-4">
      
      <ROMDashboardTypeInfo datas={romHistorys} />
      <ROMDashboardTypeList onROMItemSelect={onROMItemSelect} romHistorys={romHistorys} />
    </div>
  );
};

export default ROMDashboardTypeContainer;