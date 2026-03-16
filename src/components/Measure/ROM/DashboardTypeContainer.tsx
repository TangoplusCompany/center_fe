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
  
  // const handleROMItemSelect = (measureType: number) => {
  //     const pair = ROM_PAIRS.find(([a, b]) => a === measureType || b === measureType);
  //     const romPair : ComparePair = [
  //       romHistorys.find((item) => item.measure_type === pair?.[0])?.sn,
  //       romHistorys.find((item) => item.measure_type === pair?.[1])?.sn,
  //     ]
  //     console.log("선택됨", romPair)
  //     onROMItemSelect?.(romPair)
  //     //TODO 여기서 자꾸 가장 최신 romSN 만 선택되는 부분 수정해야함 
  //   }
  return (
    <div className="flex flex-col gap-4">
      
      <ROMDashboardTypeInfo datas={romHistorys} />
      <ROMDashboardTypeList onROMItemSelect={onROMItemSelect} romHistorys={romHistorys} />
    </div>
  );
};

export default ROMDashboardTypeContainer;