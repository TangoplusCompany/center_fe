import { Button } from "@/components/ui/button";
import { CompareSlot } from "@/types/compare";
import { IMeasureROMInfo } from "@/types/measure";

export interface ROMItemCardProps {
  romInfo: IMeasureROMInfo
  onCompareDialogOpen: (currenSlot: CompareSlot) => void;
  onROMItemSelect ?: (romSn: number) => void;
}

export const ROMItemCard = ({
  romInfo,
  onCompareDialogOpen,
  onROMItemSelect
} : ROMItemCardProps) => {

  return (
    <div 
      className="flex flex-col gap-2 p-2 border-2 border-sub100 rounded-2xl hover:border-toggleAccent transition-colors cursor-pointer"
      onClick={() => {
        if (onROMItemSelect) onROMItemSelect(1); // TODO 이 곳에다가 romItem을 식별할 수 있는 번호를 넣어줘야함
      }}
    >
      <div className="flex gap-2">
        <div className="w-20 h-20 flex flex-shrink-0 rounded-2xl bg-sub200 items-center justify-center">
          이미지
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-base font-semibold text-sub700">
            {romInfo.title}
          </div>
          <div className="text-base text-sub700">
            {romInfo.howto}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex h-full items-center text-base text-sub700">
          최근 측정일 : 2026-01-20 16:43:21
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation(); // ✅ 이벤트 버블링 중단
            onCompareDialogOpen(0);
          }}
          className="shrink-0 shadow-none bg-sub200 text-sub700 hover:text-sub900"
        >
          이전 항목 선택
        </Button>
      </div>
    </div>
  );
};

export default ROMItemCard;