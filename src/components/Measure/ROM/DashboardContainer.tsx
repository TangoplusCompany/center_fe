import { Skeleton } from "@/components/ui/skeleton";
import { useGetROMItemList } from "@/hooks/api/measure/rom/useGetROMItemList";
import { useState } from "react";
import ROMDashboardBody from "./DashboardBody";
import { useGetROMItemDetail } from "@/hooks/api/measure/rom/useGetROMItemDetail";
import { ComparePair, CompareSlot } from "@/types/compare";
import ROMBody from "./Body";
import ROMPickerDialog from "./PickerDialog";
import { useGetROMItemHistory } from "@/hooks/api/measure/rom/useGetROMItemHistory";
import { useAuthStoreOptional } from "@/providers/AuthProvider";
import ROMDashboardTotalGraph from "./DashboardTotalGrpah";

export interface ROMDashboardContainerProps {
  userSn: number;

  isMyPage: boolean;
}

export type ROMDashboardViewType = "default" | "detail";

const ROMDashboardContainer = ({
  userSn,
  isMyPage
}: ROMDashboardContainerProps ) => {
  // 0. DP type (대시보드 컨테이너 안에서 화면 전환)
  const centerSn = useAuthStoreOptional((state) => state.centerSn, 0);
  const [currentView, setCurrentView] = useState<ROMDashboardViewType>("default");
  const [romPair, setRomPair] = useState<ComparePair>([undefined, undefined]);
  const handleToggleCompareSn = (sn: number, slot: CompareSlot) => {
    setRomPair((prev) => {
      const next: ComparePair = [...prev];
      next[slot] = sn;
      return next;
    });
  };
  const [isCompareDialogOpen, setIsCompareDialogOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState<CompareSlot>(0);
  const onCompareDialogOpen = (slot: CompareSlot, selectedMeasureType ?: number) => {
    setActiveSlot(slot);
    if (selectedMeasureType !== undefined) setMeasureType(selectedMeasureType)
    setIsCompareDialogOpen(true);
  };
  const onROMItemSelect = (selectedROMPair : ComparePair) => {
    setRomPair(selectedROMPair)
    setCurrentView("detail")
  }

  
  // 1. 횡방향 탭 (관절)
  const [bodyPartNumber, setBodyPartNumber] = useState(1);
  const onSelectPart = (selectedPartNumber : number) => {
    setBodyPartNumber(selectedPartNumber)
  }

  // 2. 종방향 Table (관절 타입)
  const [measureType, setMeasureType] = useState(-1);
  const [page, setPage] = useState(1);
  const {
    data: jointROMItems,
    isLoading: jointROMLoading,
    isError: jointROMError,
  } = useGetROMItemList({
    user_sn: userSn,
    center_sn : centerSn,
    body_part_number: bodyPartNumber,
    isMyPage: isMyPage
  });
  const {
    data: romHistory,
    isLoading: romHLoading,
    isError: romHError,
  } = useGetROMItemHistory({
    user_sn: userSn,
    center_sn: centerSn,
    measure_type: measureType,
    isMyPage: isMyPage,
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
    isMyPage: isMyPage
  })

  const {
    data: romDetail1,
    isLoading: romDLoading1,
    isError: romDError1,
  } = useGetROMItemDetail({
    user_sn: userSn,
    center_sn: centerSn,
    rom_result_sn: romPair[1],
    isMyPage: isMyPage
  })

  if (jointROMLoading) return (<Skeleton></Skeleton>);
  if (jointROMError) return (
    <div className="flex items-center justify-center h-[200px] text-sm text-red-400">
      오류가 발생했습니다. 잠시후 다시 시도해주세요.
    </div>
  );
  if (romHLoading) return (<Skeleton></Skeleton>);
  if (romHError) return (
    <div className="flex items-center justify-center h-[200px] text-sm text-red-400">
      오류가 발생했습니다. 잠시후 다시 시도해주세요.
    </div>
  );
  

  return (
    <div className="flex flex-col gap-4">
      {(currentView === "default") ? (
        <>
          <div className="flex flex-1">
            <ROMDashboardTotalGraph userSn={userSn} isMyPage={isMyPage} />
          </div>

          <ROMDashboardBody 
            bodyPart={bodyPartNumber}
            setMeasureType={setMeasureType}
            measureType={measureType}
            onSelectBodyPart={onSelectPart}
            onROMItemSelect={onROMItemSelect}
            romTypeItems={jointROMItems ?? []}
            romHistory={romHistory?.rom_results ?? []} 
             />
        </>
      ) : (
        <>
          {(romPair[0] !== undefined || romPair[1] !== undefined) && (
            <ROMBody 
              data0={romDetail0} 
              data1={romDetail1} 
              onCompareDialogOpen={onCompareDialogOpen} 
              onROMItemSelect={onROMItemSelect} 
              isLoading0={romDLoading0} 
              isError0={romDError0} 
              isLoading1={romDLoading1} 
              isError1={romDError1}
              setCurrentView={setCurrentView}
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
        </>
      )}


      
    </div>
  );
};

export default ROMDashboardContainer;