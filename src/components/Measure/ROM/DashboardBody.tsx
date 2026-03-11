import ROMDashboardPartList from "./DashboardPartList";
import { ROMDashboardPartTab } from "./DashboardPartTab";
import ROMDashboardPartDetailContainer from "./DashboardPartDetailContainer";
import { useGetROMItemHistory } from "@/hooks/api/measure/rom/useGetROMItemHsitory";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { IMeasureROMItem } from "@/types/measure";

export interface ROMDashboardBodyProps {
  userSn: number;
  centerSn: number;
  measureType: number;
  jointROMItems: IMeasureROMItem[];
  onSelectBodyPart: (selectedPartNumber: number) => void;
  onSelectROMItem : (selectMeasureType: number) => void;
}

const ROMDashboardBody = ({
  userSn,
  centerSn, 
  measureType, 
  onSelectBodyPart,
  onSelectROMItem
} : ROMDashboardBodyProps) => {

  const [page,] = useState(1);
  const {
      data: romHistory,
      isLoading: romHLoading,
      isError: romHError,
    } = useGetROMItemHistory({
      user_sn: userSn,
      center_sn: centerSn,
      measure_type: measureType,
      page,
    })
  if (romHLoading) return (<Skeleton></Skeleton>);
  if (romHError) return (
    <div className="flex items-center justify-center h-[200px] text-sm text-red-400">
      오류가 발생했습니다. 잠시후 다시 시도해주세요.
    </div>
  );
  return (
    <div className="flex flex-col gap-4">
      <ROMDashboardPartTab onSelectBodyPart={onSelectBodyPart}  />
      <ROMDashboardPartList currentMeasureType={measureType} onSelectMeasureType={onSelectROMItem}  />

      {(measureType !== -1) && (
        <ROMDashboardPartDetailContainer romItems={romHistory?.rom_results ?? []} />
      )}
    </div>
  );
}

export default ROMDashboardBody;