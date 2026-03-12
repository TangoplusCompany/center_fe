import ROMDashboardPartList from "./DashboardPartList";
import { ROMDashboardPartTab } from "./DashboardPartTab";
import ROMDashboardPartDetailContainer from "./DashboardPartDetailContainer";
import { useGetROMItemHistory } from "@/hooks/api/measure/rom/useGetROMItemHsitory";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { IMeasureROMItem } from "@/types/measure";
import { ComparePair, CompareSlot } from "@/types/compare";
import { useGetROMItemDetail } from "@/hooks/api/measure/rom/useGetROMItemDetail";
import ROMBody from "./Body";
import ROMPickerDialog from "./PickerDialog";

export interface ROMDashboardBodyProps {
  userSn: number;
  centerSn: number;
  bodyPart: number;
  measureType: number;
  setMeasureType: (selectedMeasureType: number) => void;
  jointROMItems: IMeasureROMItem[];
  onSelectBodyPart: (selectedPartNumber: number) => void;
  onSelectROMItem : (selectMeasureType: number) => void;
    isResultPage: boolean;
}

const ROMDashboardBody = ({
  userSn,
  centerSn, 
  bodyPart,
  measureType, 
  setMeasureType,
  jointROMItems,
  onSelectBodyPart,
  onSelectROMItem,
  isResultPage,
} : ROMDashboardBodyProps) => {
  const [romPair, setRomPair] = useState<ComparePair>([undefined, undefined]);
  const handleToggleCompareSn = (sn: number, slot: CompareSlot) => {
    setRomPair((prev) => {
      const next: ComparePair = [...prev]; 
      next[slot] = sn;                    
      return next;                         
    });
  };
  const onROMItemSelect = (selectedROMPair : ComparePair) => {
    
    setRomPair(selectedROMPair)
    console.log("눌림2번째부모", romPair)
  }
  const [isCompareDialogOpen, setIsCompareDialogOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState<CompareSlot>(0);
  const onCompareDialogOpen = (slot: CompareSlot, selectedMeasureType ?: number) => {
    setActiveSlot(slot);
    if (selectedMeasureType !== undefined) setMeasureType(selectedMeasureType)
    setIsCompareDialogOpen(true);
  };

  const [page, setPage] = useState(1);
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
  const {
    data: romDetail0,
    isLoading: romDLoading0,
    isError: romDError0,
  } = useGetROMItemDetail({
    user_sn: userSn,
    center_sn: centerSn,
    rom_result_sn: romPair[0],
    isResultPage: isResultPage
  })
    
  // rightROMItemDetail
  const {
    data: romDetail1,
    isLoading: romDLoading1,
    isError: romDError1,
  } = useGetROMItemDetail({
    user_sn: userSn,
    center_sn: centerSn,
    rom_result_sn: romPair[1],
    isResultPage: isResultPage
  })
    
  if (romHLoading) return (<Skeleton></Skeleton>);
  if (romHError) return (
    <div className="flex items-center justify-center h-[200px] text-sm text-red-400">
      오류가 발생했습니다. 잠시후 다시 시도해주세요.
    </div>
  );
  return (
    <div className="flex flex-col gap-4">
      <ROMDashboardPartTab onSelectBodyPart={onSelectBodyPart} currentBodyPart={bodyPart} setMeasureType={setMeasureType} />
      <ROMDashboardPartList romTypeItems={jointROMItems} onSelectMeasureType={onSelectROMItem}   />

      {(measureType !== -1) && (
        <ROMDashboardPartDetailContainer romItems={romHistory?.rom_results ?? []} onROMItemSelect={onROMItemSelect} />
      )}

      {(romPair !== undefined && romDetail0 !== undefined) && (
        <ROMBody 
        data0={romDetail0} 
        data1={romDetail1} 
        onCompareDialogOpen={onCompareDialogOpen} 
        onROMItemSelect={onROMItemSelect} 
        isLoading0={romDLoading0} 
        isError0={romDError0} 
        isLoading1={romDLoading1} 
        isError1={romDError1}
        />
      )}
      <ROMPickerDialog
        open={isCompareDialogOpen}
        items={romHistory?.rom_results ?? []}
        title={romHistory?.rom_results?.find((it) => it.measure_type === measureType)?.title ?? ""}
        comparePair={romPair}
        activeSlot={activeSlot}
        onOpenChange={setIsCompareDialogOpen}
        onToggleCompareSn={(sn, slot) => {
          handleToggleCompareSn(sn, slot);
          setIsCompareDialogOpen(false);
        }}
        pagination={{
          page: romHistory?.page ?? 1,
          limit: romHistory?.limit ?? 10,
          last_page: romHistory?.last_page ?? 1,
          setPage,
        }}
        isLoading={romHLoading}
        isError={romHError}
      />
    
    </div>
  );
}

export default ROMDashboardBody;