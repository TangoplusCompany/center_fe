import { ComparePair, CompareSlot } from "@/types/compare";
import CompareDateCard from "../Basic/DateCard";
import { useMeasureInfo } from "@/hooks/api/measure/useMeasureInfo";
import CompareBodySkeleton from "../Basic/BodySkeleton";
import { useTranslations } from "next-intl";
import BiaContainer from "../../Bia/BiaContainer";
import CompareDefault from "../CompareDefault";

const CompareBiaBody = ({
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
            regDate={leftData ? leftData?.bia_result?.measure_date : ""}
            currentSlot={0}
            onCardClick={onCompareDialogOpen} />
        </div>
        <div className="min-w-0">
          <CompareDateCard 
            regDate={rightData ? rightData?.bia_result?.measure_date : ""}
            currentSlot={1}
            onCardClick={onCompareDialogOpen} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <>
          {leftData?.bia_result ? (
            <BiaContainer data={leftData.bia_result} isCompare={true} />
          ) : (
            <CompareDefault className="w-full h-[733px]" onCompareDialogOpen={onCompareDialogOpen} currentSlot={0} />
          )}
        </>
        <>
          {rightData?.bia_result ? (
            <BiaContainer data={rightData.bia_result} isCompare={true} />
          ) : (
            <CompareDefault className="w-full h-[733px]" onCompareDialogOpen={onCompareDialogOpen} currentSlot={1} />
          )}
        </>
      </div>
    </div>
  );
}

export default CompareBiaBody;