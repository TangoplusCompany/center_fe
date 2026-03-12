import { Skeleton } from "@/components/ui/skeleton";
import { useGetROMItemList } from "@/hooks/api/measure/rom/useGetROMItemList";
import { useAuthStoreOptional } from "@/providers/AuthProvider";
import { useState } from "react";
import ROMDashboardCardFrequent from "./DashboardCardFrequent";
import ROMDashboardCardRecent from "./DashboardCardRecent";
import ROMDashboardBody from "./DashboardBody";
import { TROMSelectPart } from "@/types/dashboard";

export interface ROMDashboardContainerProps {
  userSn: number;
  centerSn: number;
  isResultPage: boolean;
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
  const frequentData :TROMSelectPart = {
    romName: "발목",
    count: 7,
    description: `[정면] 발목 굽힘 검사를 ${7}회간 검사했습니다.`
  }
  const recentData :TROMSelectPart = {
    romName: "무릎",
    count: 0,
    description: `${"2026-05-21"}에 [오른측면] 무릎관절 폄 검사를 진행했습니다.`
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-2">
        <ROMDashboardCardFrequent data={frequentData} />
        <ROMDashboardCardRecent data={recentData} />
      </div>

      <ROMDashboardBody 
        userSn={data.userSn}
        centerSn={centerSn}
        bodyPart={bodyPartNumber}
        setMeasureType={setMeasureType}
        measureType={measureType}
        jointROMItems={jointROMItems ?? []}
        onSelectBodyPart={onSelectPart}
        onSelectROMItem={onSelectROMItem} isResultPage={false}        />
    </div>
  );
};

export default ROMDashboardContainer;