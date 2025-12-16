"use client";

type MeasureItem = {
  measure_sn: number;
  user_name: string;
  measure_date: string;
  device_name?: string;
};

type Props = {
  measureList?: MeasureItem[];
  compareSelectedSns: number[];
};

const CompareFooter = ({
  measureList = [],
  compareSelectedSns,
}: Props) => {
  const selected = compareSelectedSns
    .map((sn) => measureList.find((m) => m.measure_sn === sn))
    .filter(Boolean) as MeasureItem[];

  return (
    <div className="sticky bottom-0 z-20 w-full border-t bg-white">
      <div className="flex items-center justify-between gap-3 p-3">
        {/* 선택 요약(1~2개) */}
        <div className="flex flex-1 gap-2">
          {selected.length === 0 && (
            <div className="text-sm text-gray-500">선택된 측정이 없습니다.</div>
          )}

          {selected.map((m) => (
            <div key={m.measure_sn} className="flex-1 rounded-2xl border p-3">
              <div className="text-sm font-semibold">{m.user_name}</div>
              <div className="text-xs text-gray-600">{m.measure_date}</div>
              {m.device_name && (
                <div className="text-xs text-gray-500">{m.device_name}</div>
              )}
              <div className="text-xs text-gray-400 mt-1">SN: {m.measure_sn}</div>
            </div>
          ))}

          {/* 1개만 선택된 경우 우측 카드 자리 표시(원하시면) */}
          {selected.length === 1 && (
            <div className="flex-1 rounded-2xl border border-dashed p-3 text-sm text-gray-400 flex items-center justify-center">
              비교할 측정을 추가로 선택하세요
            </div>
          )}
        </div>

        {/* 우측 버튼 영역(선택) */}
        <div className="flex items-center gap-2">
          {/* {onClear && (
            <button
              type="button"
              onClick={onClear}
              className="h-10 px-3 rounded-xl border text-sm"
            >
              선택 초기화
            </button>
          )} */}
          
        </div>
      </div>
    </div>
  );
};

export default CompareFooter;