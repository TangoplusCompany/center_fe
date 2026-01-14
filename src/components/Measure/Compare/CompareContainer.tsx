import { IMeasureList } from "@/types/measure";
import CompareBody from "./CompareBody";
import { ComparePair, CompareSlot } from "@/types/compare";

const CompareContainer = ({
  userSn,
  comparePair,
  onClose,
  // onRemoveCompare,
  onCompareDialogOpen,
  onCloseCompareMode
}: {
  userSn: string;
  measureList? : IMeasureList[];
  comparePair: ComparePair;
  onClose: () => void;
  // onRemoveCompare: (slot: CompareSlot) => void;
  onCompareDialogOpen: (slot: CompareSlot) => void;
  onCloseCompareMode : () => void;
}) => {
  
  
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
        <CompareBody 
          userSn={userSn}
          comparePair={comparePair}
          // onRemoveCompare={onRemoveCompare}
          onCompareDialogOpen={onCompareDialogOpen}
           />
      </div>
    </div>
  );

};


export default CompareContainer;