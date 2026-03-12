import { IMeasureROMItem } from "@/types/measure";
import { ROMDashboardPartDetailInfo } from "./DashboardPartDetailInfo";
import ROMDashboardPartDetailList from "./DashboardPartDetailList";
import { ROM_PAIRS } from "./ItemContainer";
import { ComparePair } from "@/types/compare";

export interface ROMDashboardPartDetailContainerProps {
  romItems: IMeasureROMItem[]
  onROMItemSelect ?: (romSn: ComparePair) => void;
}


const ROMDashboardPartDetailContainer = ({
  romItems,
  onROMItemSelect
}: ROMDashboardPartDetailContainerProps) => {
  const handleROMItemSelect = (measureType: number) => {
      const pair = ROM_PAIRS.find(([a, b]) => a === measureType || b === measureType);
      const romPair : ComparePair = [
        romItems.find((item) => item.measure_type === pair?.[0])?.sn,
        romItems.find((item) => item.measure_type === pair?.[1])?.sn,
      ]
      console.log("눌림1번째부모", romItems, "목록",romPair)
      onROMItemSelect?.(romPair)
    }
  return (
    <div className="flex flex-col gap-4">
      
      <ROMDashboardPartDetailInfo data={romItems[0]} />
      <ROMDashboardPartDetailList handleROMItemSelect={handleROMItemSelect} romHistorys={romItems} />
    </div>
  );
};

export default ROMDashboardPartDetailContainer;