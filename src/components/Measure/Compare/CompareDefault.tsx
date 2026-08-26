import { CompareSlot } from "@/types/compare";
import { useTranslations } from "next-intl";

const CompareDefault = ({ 
  className,
  onCompareDialogOpen,
  currentSlot,
}: { 
  className?: string;
  onCompareDialogOpen?: (slot: CompareSlot) => void;
  currentSlot?: CompareSlot;
}) => {
  const t = useTranslations("Index")
  return (
    
    <div className="flex flex-col h-full min-h-0 gap-4">
      {/* ✅ 상단(좌/우) 영역: 남는 높이 전부 */}
      <div className="flex-1 min-h-0">
        <div className="grid h-full min-h-0 gap-4 items-stretch">
          <div
            role="button"
            tabIndex={0}
            onClick={onCompareDialogOpen && currentSlot ? () => onCompareDialogOpen(currentSlot) : undefined}
            className={[
              "relative h-full rounded-3xl border-2 border-sub300/50 border-dashed box-border",
              "transition cursor-pointer select-none",
              "hover:border-sub400 active:bg-sub400",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mainBlue-600",
              className ?? "",
            ].join(" ")}
          >

            <div className="absolute inset-0 flex items-center justify-center text-center">
              {t('compare_guide')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareDefault;