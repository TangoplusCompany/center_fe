import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ComparePair, CompareSlot } from "@/types/compare";
import { IMeasureList } from "@/types/measure";

type MeasurePickerDialogProps = {
  open: boolean;
  items: IMeasureList[];
  comparePair: ComparePair;
  activeSlot: CompareSlot;
  onOpenChange: (v: boolean) => void;
  onToggleCompareSn: (measureSn : number, slot: CompareSlot) => void;
};

export const MeasurePickerDialog = ({
  open,
  items,
  comparePair,
  activeSlot,
  onOpenChange,
  onToggleCompareSn,
}: MeasurePickerDialogProps) => {
  const filteredItems = items.filter((it) =>
    !comparePair.includes(it.measure_sn)
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md rounded-2xl bg-white p-4">
        {/* 헤더 */}
        <DialogTitle className="text-base font-semibold mb-3">
          측정 목록 선택
        </DialogTitle>

        {/* 내용 영역 */}
        <div className="max-h-[360px] overflow-auto">
          {filteredItems.length === 0 ? (
            <div className="flex items-center justify-center h-[200px] text-sm text-gray-400">
              비교할 항목이 없습니다.
            </div>
          ) : (
            <div className="space-y-2">
              {filteredItems.map((it) => (
                <button
                  key={it.measure_sn}
                  type="button"
                  className="w-full text-left rounded-xl border px-3 py-2 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    onToggleCompareSn(it.measure_sn, activeSlot);
                    onOpenChange(false);
                  }}
                >
                  <div className="text-sm font-medium">
                    {it.measure_date}
                  </div>
                  <div className="text-xs text-gray-500">
                    장치이름: {it.device_name}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};