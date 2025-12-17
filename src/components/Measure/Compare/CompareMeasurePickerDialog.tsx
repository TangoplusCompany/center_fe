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
  if (!open) return null;


  const filteredItems = items.filter((it) =>
    !comparePair.includes(it.measure_sn)
  );

  return (
    <div className="fixed inset-0 z-50">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => onOpenChange(false)}
      />

      {/* panel */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border p-4">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold">측정 목록 선택</h3>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-800"
              onClick={() => onOpenChange(false)}
            >
              ✕
            </button>
          </div>

          {/* ✅ 내용 영역 */}
          <div className="max-h-[360px] overflow-auto">
            {filteredItems.length === 0 ? (
              // 👉 선택된 비교 항목이 없을 때
              <div className="flex items-center justify-center h-[200px] text-sm text-gray-400">
                비교할 항목이 없습니다.
              </div>
            ) : (
              <div className="space-y-2">
                {filteredItems.map((it) => (
                  <button
                    key={it.measure_sn}
                    type="button"
                    className="w-full text-left rounded-xl border px-3 py-2 hover:bg-gray-50 transition"
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
        </div>
      </div>
    </div>
  );
};
