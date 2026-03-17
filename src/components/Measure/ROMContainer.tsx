"use client"


import { useGetROMItemDetail } from "@/hooks/api/measure/rom/useGetROMItemDetail";
import { useGetROMItemHistory } from "@/hooks/api/measure/rom/useGetROMItemHistory";
import { useGetROMItems } from "@/hooks/api/measure/rom/useGetROMItems";
import { ComparePair, CompareSlot } from "@/types/compare";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import ROMItemContainer from "./ROM/ItemContainer";
import ROMBody from "./ROM/Body";
import ROMPickerDialog from "./ROM/PickerDialog";
import { useGetQuery } from "@/hooks/utils/useGetQuery";
import { MeasureDetailSkeleton } from "./DetailContainer";
import { useMeasureDecrypt } from "@/hooks/auth/useMeasureDecrypt";
import { useAuthStoreOptional } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/formatDate";


export const MeasureROMContainer = () => {
  const { query } = useGetQuery();
  const encryptedParam = query['data'];  // measureSn → data로 변경
  const [measureType, setMeasureType] = useState(-1); // 이전 항목 선택을 관리하는 ROM 타입

  const [page, setPage] = useState(1);
  const router = useRouter();
  const onROMItemSelect = (romPair : ComparePair) => {
    setRomPair(romPair)
  }
  const [isCompareDialogOpen, setIsCompareDialogOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState<CompareSlot>(0);
  const onCompareDialogOpen = (slot: CompareSlot, selectedMeasureType ?: number) => {
    setActiveSlot(slot);
    if (selectedMeasureType !== undefined) setMeasureType(selectedMeasureType)
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
    data: decryptedData,
    isLoading: decryptLoading,
    isError: decryptError,
  } = useMeasureDecrypt(encryptedParam);
  
  
  const userSn = decryptedData?.user_sn ?? -1
  const measureSn = decryptedData?.measure_sn ?? -1
  const centerSn = useAuthStoreOptional((state) => state.centerSn, 0);

  

  const {
    data: romItems,
    isLoading: romLoading,
    isError: romError,
  } = useGetROMItems({
    user_sn: userSn,
    center_sn: centerSn,
    measure_sn: measureSn,
    isMyPage: false
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
    isMyPage: false
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
    isMyPage: false
  })
  
  if (decryptLoading) return <MeasureDetailSkeleton />;
  if (decryptError) return <div>잘못된 접근입니다.</div>;
  return (
    <div className="flex flex-col gap-4">
      
      {romItems && (
        <div className="flex items-center gap-3">
          <div className="w-1 h-12 bg-toggleAccent rounded-full"></div>
          <h2 className="text-3xl font-semibold text-[#333] dark:text-white flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span>{romItems[0].user_name}님 ROM 측정 결과</span>
            <span className="text-sm text-sub300 dark:text-sub200 sm:pl-2"> {formatDate(romItems[0].reg_date.slice(0,16))}</span>
          </h2>
        </div>
      )}

      {(romPair[0] === undefined && romPair[1] === undefined) && (
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
          <div className="flex flex-col items-start gap-4">
            <button
              type="button"
              onClick={() => {
                router.push(`/measure/`);
              }}
              className="py-1 rounded-md text-base text-sub700"
            >
              ← 목록으로
            </button>
            <ROMItemContainer datas={romItems ?? []} onROMItemSelect={onROMItemSelect} isUserPage={false} />
          </div>
          
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
        title={romItems?.find((it) => it.measure_type === measureType)?.title ?? ""}
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

export default MeasureROMContainer;