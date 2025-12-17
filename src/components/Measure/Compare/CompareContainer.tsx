import { IMeasureList, IUserMeasurement } from "@/types/measure";
import CompareBody from "./CompareBody";
import { useMeasureDetail } from "@/hooks/api/measure/useMeasureDetail";
import { ComparePair, CompareSlot } from "@/types/compare";

const CompareContainer = ({
  userUUID,
  comparePair,
  onClose,
  onRemoveCompare,
  onCompareDialogOpen,
  onCloseCompareMode
}: {
  userUUID: string;
  measureList? : IMeasureList[];
  comparePair: ComparePair;
  onClose: () => void;
  onRemoveCompare: (slot: CompareSlot) => void;
  onCompareDialogOpen: (slot: CompareSlot) => void;
  onCloseCompareMode : () => void;
}) => {
  const leftSn = comparePair[0];
  const rightSn = comparePair[1];

  // ✅ 좌/우 상세 데이터 로딩 (이미 쓰고 계신 훅 재사용)
  const leftEnabled = !!leftSn;
  const rightEnabled = !!rightSn;
  const {
    data: leftData,
    isLoading: leftLoading,
    isError: leftError,
  } = useMeasureDetail<IUserMeasurement>(leftEnabled ? leftSn : undefined, userUUID);

  const {
    data: rightData,
    isLoading: rightLoading,
    isError: rightError,
  } = useMeasureDetail<IUserMeasurement>(rightEnabled ? rightSn : undefined, userUUID);

  
  return (
    <div className="w-full h-full min-h-0 flex flex-col">
      {/* 상단(고정) */}
      <div className="shrink-0">
        <div className="flex items-center justify-between p-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();             // ✅ comparePair 초기화(또는 기타 닫기 로직)
              onCloseCompareMode();  // ✅ isCompareMode = false
            }}
            className="px-3 py-1 rounded-md text-sm text-primary-foreground"
          >
            ← 목록으로
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-4">
        {/* 로딩/에러 처리(원하시면 더 세분화 가능) */}
        {(leftLoading || rightLoading) && <div>불러오는 중...</div>}
        {(leftError || rightError) && <div>데이터 로딩 중 오류가 발생했습니다.</div>}

        {!leftLoading && !rightLoading && !leftError && !rightError && (
          <CompareBody 
          leftData={leftData} 
          rightData={rightData}
          onRemoveCompare={onRemoveCompare}
          onCompareDialogOpen={onCompareDialogOpen}
           />
        )}
      </div>
    </div>
  );

};


export default CompareContainer;