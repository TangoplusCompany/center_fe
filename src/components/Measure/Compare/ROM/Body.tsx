import { useMeasureInfo } from "@/hooks/api/measure/useMeasureInfo";
import { ComparePair, CompareSlot } from "@/types/compare";
import { useTranslations } from "next-intl";
import CompareBodySkeleton from "../Basic/BodySkeleton";
import CompareDateCard from "../Basic/DateCard";
import { CompareROMContainer } from "./Container";
import CompareDefault from "../CompareDefault";
import { useState } from "react";

export const CompareROMBody  = ({
  userSn,
  comparePair,
  onCompareDialogOpen,
  isMyPage = false,
} : {
  userSn: string;
  comparePair: ComparePair;
  onCompareDialogOpen: (slot: CompareSlot) => void;
  isMyPage: boolean;
}) => {
  const t = useTranslations("Index");
  const leftSn = comparePair[0];
  const rightSn = comparePair[1];
  const leftEnabled = !!leftSn;
  const rightEnabled = !!rightSn;
  const [romMeasureType, setRomMeasureType] = useState<number>();
  const {
    data: leftData,
    isLoading: leftLoading,
    isError: leftError,
  } = useMeasureInfo({
    measure_sn: leftEnabled ? leftSn : undefined,
    user_sn: userSn,
    isMyPage,
  });

  const {
    data: rightData,
    isLoading: rightLoading,
    isError: rightError,
  } = useMeasureInfo({
    measure_sn: rightEnabled ? rightSn : undefined,
    user_sn: userSn,
    isMyPage,
  });

  
  if (leftLoading || rightLoading) {
    return <CompareBodySkeleton />;
  }

  if (leftError || rightError) {
    return <div>{t('etc_error')}</div>;
  }
  
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 items-stretch w-full">
        <div className="min-w-0">
          <CompareDateCard 
            regDate={leftData ? leftData?.rom_result?.[0]?.reg_date : ""}
            currentSlot={0}
            onCardClick={onCompareDialogOpen} />
        </div>
        <div className="min-w-0">
          <CompareDateCard 
            regDate={rightData ? rightData?.rom_result?.[0]?.reg_date : ""}
            currentSlot={1}
            onCardClick={onCompareDialogOpen} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <>
          {leftData?.rom_result ? (
            <CompareROMContainer datas={leftData.rom_result} romMeasureType={romMeasureType} setRomMeasureType={setRomMeasureType} /> 
          ) : (
            <CompareDefault className="w-full h-[272px]" onCompareDialogOpen={onCompareDialogOpen} currentSlot={0} />
          )}
        </>
        
        <>
          {rightData?.rom_result ? (
            <CompareROMContainer datas={rightData.rom_result} romMeasureType={romMeasureType} setRomMeasureType={setRomMeasureType} /> 
          ) : (
            <CompareDefault className="w-full h-[272px]" onCompareDialogOpen={onCompareDialogOpen} currentSlot={1} />
          )}
        </>
      </div>

    </div>
  );
}