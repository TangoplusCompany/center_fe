import { Skeleton } from "@/components/ui/skeleton";
import { useGetROMItemList } from "@/hooks/api/measure/rom/useGetROMItemList";
import { useAuthStoreOptional } from "@/providers/AuthProvider";
import { useState } from "react";
import ROMDashboardCardFrequent from "./DashboardCardFrequent";
import ROMDashboardCardRecent from "./DashboardCardRecent";
import ROMDashboardBody from "./DashboardBody";

export interface ROMDashboardContainerProps {
  userSn: number;
  centerSn: number;
}


const ROMDashboardContainer = (
  data: ROMDashboardContainerProps
) => {
  const [bodyPartNumber, setBodyPartNumber] = useState(1);
  const onSelectPart = (selectedPartNumber : number) => {
    setBodyPartNumber(selectedPartNumber)
  }
  const centerSn = useAuthStoreOptional((state) => state.centerSn, 0);

  const [measureType, setMeasureType] = useState(-1);
  const onSelectROMItem = (selectedMeasureType : number) => {
    setMeasureType(selectedMeasureType)
  }
  const {
    data: jointROMItems,
    isLoading: jointROMLoading,
    isError: jointROMError,
  } = useGetROMItemList({
    user_sn: data.userSn,
    center_sn : centerSn,
    body_part_number: bodyPartNumber
  });
  
  if (jointROMLoading) return (<Skeleton></Skeleton>);
  if (jointROMError) return (
    <div className="flex items-center justify-center h-[200px] text-sm text-red-400">
      오류가 발생했습니다. 잠시후 다시 시도해주세요.
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-2">
        <ROMDashboardCardFrequent data={{
          romName: "",
          count: 0,
          description: ""
        }} />
        <ROMDashboardCardRecent data={{
          romName: "",
          count: 0,
          description: ""
        }} />
      </div>

      <ROMDashboardBody 
        userSn={data.userSn} 
        centerSn={centerSn} 
        measureType={measureType} 
        jointROMItems={jointROMItems ?? []} 
        onSelectBodyPart={onSelectPart}
        onSelectROMItem={onSelectROMItem}  
        />
    </div>
  );
};

export default ROMDashboardContainer;