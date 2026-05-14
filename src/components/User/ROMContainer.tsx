import { useState } from "react";
import { ComparePair, CompareSlot } from "@/types/compare";
import ROMPickerDialog from "../Measure/ROM/PickerDialog";
import ROMItemContainer from "../Measure/ROM/ItemContainer";
import { Skeleton } from "../ui/skeleton";
import { useAuthStoreOptional } from "@/providers/AuthProvider";
import { useGetROMItemHistory } from "@/hooks/api/measure/rom/useGetROMItemHistory";
import ROMBody from "../Measure/ROM/Body";
import { useGetROMItemDetail } from "@/hooks/api/measure/rom/useGetROMItemDetail";
import { useGetROMItems } from "@/hooks/api/measure/rom/useGetROMItems";
import { formatDate } from "@/utils/formatDate";
import { Button } from "../ui/button";
import { LayoutDashboardIcon } from "lucide-react";
import CenterUserDashboardContainer from "./DashBoardContainer";
import { actionPrintEncrypt } from "@/app/actions/getCrypto";
import { getResultRomReportUrl } from "@/app/actions/openRomPrintPage";

export interface UserROMProps {
  userSn: number,
  measureSn: number,
  uuid: string,
  mobile: string,
  isMyPage: boolean
}
export const CenterUserROMContainer = ({
  userSn,
  measureSn,
  uuid,
  mobile,
  isMyPage,
}: UserROMProps) => {

  const [measureType, setMeasureType] = useState(-1); // 이전 항목 선택을 관리하는 ROM 타입

  const centerSn = useAuthStoreOptional((state) => state.centerSn, 0);
  const [page, setPage] = useState(1);

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
  const handlePrint = async () => {
    
    const cryptoData = {
      sn: measureSn,
      user_uuid: uuid,
      receiver: mobile,
    };
    const encryptData = await actionPrintEncrypt(cryptoData);
    try {
      const url = await getResultRomReportUrl(encryptData);
      // 🔗 크롬(브라우저) 새 창/새 탭으로 리포트 페이지 열기
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (e) {
      console.error("리포트 URL 생성 실패:", e);
      alert("리포트 페이지를 생성하는 중 오류가 발생했습니다.");
    }
  };
  const {
    data: romItems,
    isLoading: romLoading,
    isError: romError,
  } = useGetROMItems({
    user_sn: userSn,
    center_sn: centerSn,
    measure_sn: measureSn,
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
    isMyPage:isMyPage,
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
    isMyPage: isMyPage
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
    isMyPage: isMyPage
  })
  const [showROMDashboard, setShowROMDashboard] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      {showROMDashboard ? (
        /* --- 1. 대시보드 화면 --- */
        <CenterUserDashboardContainer 
          userSn={userSn}
          isMyPage={isMyPage}
          fromROMContainer={true}       
        />
      ) : (
        /* --- 2. 기존 목록/상세 화면 (전체) --- */
        <>
          <div className="flex text-base justify-between items-center">
            {formatDate(romItems?.[0].reg_date ?? "")}
            <div className="flex gap-2">
              <Button 
                className="hover:bg-sub200 bg-sub150 transition-colors text-primary-foreground text-sub700"
                variant="default"
                onClick={() => {
                  handlePrint()
                }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/icons/ic_print.svg"
                  alt="인쇄하기"
                  className="gap-4 size-4 dark:[filter:brightness(0)_invert(1)]"
                />
                인쇄하기
              </Button>
              <Button 
                className="hover:bg-sub200 bg-sub150 transition-colors text-primary-foreground text-sub700" 
                onClick={() => setShowROMDashboard(true)}
                >
                  <LayoutDashboardIcon className="w-4 h-4"/>
                부위별 대시보드
              </Button>
            </div>
          </div>

          {/* 목록 섹션 (데이터가 선택되지 않았을 때) */}
          {(romPair[0] === undefined && romPair[1] === undefined) && (
            romLoading ? (
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="w-full h-64 rounded-xl" />
                ))}
              </div>
            ) : romError ? (
              <div className="flex items-center justify-center h-[200px] text-sm text-red-400">
                오류가 발생했습니다. 잠시후 다시 시도해주세요.
              </div>
            ) : (
              <ROMItemContainer datas={romItems ?? []} onROMItemSelect={onROMItemSelect} isUserPage={true} />
            )
          )}

          {/* 상세 섹션 (데이터가 선택되었을 때) */}
          {(romPair[0] !== undefined && romDetail0 !== undefined) && (
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

          {/* 다이얼로그는 기존 화면의 부속물이므로 여기에 위치 */}
          <ROMPickerDialog
            open={isCompareDialogOpen}
            items={romHistory?.rom_results ?? []}
            title={romItems?.find((it) => it.measure_type === measureType)?.title ?? ""}
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

export default CenterUserROMContainer;