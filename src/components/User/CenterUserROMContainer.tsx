import { useState } from "react";
import ROMPartTab from "../Measure/ROM/PartTab";
import { ComparePair, CompareSlot } from "@/types/compare";
import ROMPickerDialog from "../Measure/ROM/PickerDialog";
import ROMItemContainer from "../Measure/ROM/ItemContainer";
import { useGetROMItemList } from "@/hooks/api/measure/rom/useGetROMItemList";
import { Skeleton } from "../ui/skeleton";
import { useAuthStore } from "@/providers/AuthProvider";
import { useGetROMItemHistory } from "@/hooks/api/measure/rom/useGetROMItemHsitory";
import ROMBody from "../Measure/ROM/Body";
import { useGetROMItemDetail } from "@/hooks/api/measure/rom/useGetROMItemDetail";

export interface UserROMProps {
  userSn: number
}
export const CenterUserROMContainer = ({
  userSn,
}: UserROMProps) => {
  const [bodyPart, setBodyPart] = useState(1); // 상단 탭 선택하는 bodyPart
  const [measureType, setMeasureType] = useState(-1); // 이전 항목 선택을 관리하는 ROM 타입

  const centerSn = useAuthStore((state) => state.centerSn);
  const [page, setPage] = useState(1);
  const onPartSelect = (part: number) => {
    setBodyPart(part);
  };
  const onROMItemSelect = (romSn : number, isLeft: boolean) => {
    setRomPair(isLeft ? [romSn, romPair[1]] : [romPair[0], romSn]) 
    console.log("rom담기", romSn, isLeft, romPair)
  }
  const [isCompareDialogOpen, setIsCompareDialogOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState<CompareSlot>(0);
  const onCompareDialogOpen = (slot: CompareSlot, measureType?: number) => {
    setActiveSlot(slot);
    if (measureType !== undefined) setMeasureType(measureType)
    setIsCompareDialogOpen(true);
  };
  const [romPair, setRomPair] = useState<ComparePair>([undefined, undefined]);
  const handleToggleCompareSn = (sn: number, slot: CompareSlot) => {
    setRomPair((prev) => {
      const next: ComparePair = [...prev]; 
      next[slot] = sn;                    
      return next;                         
    });
  };

  const {
    data: romList,
    isLoading: romLoading,
    isError: romError,
  } = useGetROMItemList({
    user_sn: userSn,
    center_sn: centerSn,
    body_part_number: bodyPart,
  });

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

  // leftROMItemDetail
  const {
    data: romDetail0,
    isLoading: romDLoading0,
    isError: romDError0,
  } = useGetROMItemDetail({
    user_sn: userSn,
    center_sn: centerSn,
    rom_result_sn: romPair[0],
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
  })
  return (
    <div className="flex flex-col gap-4">
      <ROMPartTab onPartSelect={onPartSelect} onROMItemSelect={onROMItemSelect} romPair={romPair}/>
      {(romPair !== undefined ) && (
        romLoading ? (
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="w-full h-64 rounded-xl" />
            <Skeleton className="w-full h-64 rounded-xl" />
            <Skeleton className="w-full h-64 rounded-xl" />
            <Skeleton className="w-full h-64 rounded-xl" />
          </div>
        ) : romError ? (
          <div className="flex items-center justify-center h-[200px] text-sm text-red-400">
            오류가 발생했습니다. 잠시후 다시 시도해주세요.
          </div>
        ) : (
          <ROMItemContainer datas={romList ?? []} onCompareDialogOpen={onCompareDialogOpen} onROMItemSelect={onROMItemSelect} />
        )
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
        items={romHistory?.rom_results ?? [] } 
        title={romList?.find((it) => it.measure_type === measureType)?.title ?? ""}
        comparePair={romPair}
        activeSlot={ activeSlot }
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
  )
};

export default CenterUserROMContainer;