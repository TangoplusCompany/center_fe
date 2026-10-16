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
    <div
      role="button"
      tabIndex={0}
      onClick={onCompareDialogOpen && currentSlot ? () => onCompareDialogOpen(currentSlot) : undefined}
      className={[
        "relative rounded-3xl border-2 border-sub300/50 border-dashed box-border",
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
  );
};

export default CompareDefault;