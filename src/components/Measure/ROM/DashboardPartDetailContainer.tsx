import { IMeasureROMItem } from "@/types/measure";
import { ROMDashboardPartDetailInfo } from "./DashboardPartDetailInfo";
import ROMDashboardPartDetailList from "./DashboardPartDetailList";

export interface ROMDashboardPartDetailContainerProps {
  romItems: IMeasureROMItem[]
}


const ROMDashboardPartDetailContainer = ({
  romItems
}: ROMDashboardPartDetailContainerProps) => {
  
  return (
    <div className="flex flex-col gap-4">
      
      <ROMDashboardPartDetailInfo data={romItems[0]} />
      <ROMDashboardPartDetailList romHistorys={[]} />
    </div>
  );
};

export default ROMDashboardPartDetailContainer;