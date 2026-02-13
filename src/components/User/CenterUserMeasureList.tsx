import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IMeasureList } from "@/types/measure";
import { CompareSlot } from "@/types/compare";

export const CenterUserMeasureList = ({
  measures,
  onRowClick,
  // deleteSelectedSns,
  // onToggleDeleteSn,
  onToggleCompareSn,
  onOpenCompareMode,
}: {
  measures: IMeasureList[];
  onRowClick?: (measureSn: number) => void;

  // deleteSelectedSns: number[];
  // onToggleDeleteSn: (sn: number) => void;
  onToggleCompareSn?: (sn: number, slot: CompareSlot) => void;
  onOpenCompareMode: () => void;
}) => {
  return (
    <div className="w-full table table-fixed min-w-0">
      <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {/* ✅ 체크박스 컬럼 */}
            {/* <TableHead className="w-10 text-center"></TableHead> */}

            <TableHead className="text-center text-xs sm:text-sm whitespace-nowrap">측정 위치</TableHead>
            <TableHead className="text-center text-xs sm:text-sm whitespace-nowrap">측정 일자</TableHead>
            <TableHead className="text-center text-xs sm:text-sm whitespace-nowrap">측정 기기</TableHead>
            <TableHead className="text-center text-xs sm:text-sm whitespace-nowrap">측정 요약</TableHead>

          </TableRow>
        </TableHeader>

        <TableBody>
          {measures.map((measure) => {
            const sn = measure.measure_sn;
            // const checked = deleteSelectedSns.includes(sn);

            return (
              <TableRow 
              key={sn} 
              onClick={onRowClick ? () => onRowClick(sn) : undefined}
              className={onRowClick ? "cursor-pointer hover:bg-sub100" : ""}
              >
                {/* ✅ 삭제 선택 체크박스 */}
                {/* <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleDeleteSn(sn)}
                  />
                </TableCell> */}

                <TableCell className="text-center font-medium text-xs sm:text-sm whitespace-nowrap">
                  {measure.center_name ?? "-"}
                </TableCell>
                <TableCell className="text-center text-xs sm:text-sm whitespace-nowrap">{measure.measure_date}</TableCell>
                <TableCell className="text-center text-xs sm:text-sm whitespace-nowrap">{measure.device_name}</TableCell>
                {/* <TableCell className="text-center">
                  <div>
                    <span className={`
                      flex inline-flex items-center justify-center mx-auto
                      px-2 py-1 ${textBgCondition1} ${textLeftRightCondition1}
                      text-xs rounded-full
                    `}>
                      {levelString1} {data1?.range_level}단계
                    </span>
                    <span className={`
                      flex inline-flex items-center justify-center mx-auto
                      px-2 py-1 ${textBgCondition1} ${textLeftRightCondition1}
                      text-xs rounded-full
                    `}>
                      {levelString1} {data1?.range_level}단계
                    </span>
                  </div>
                </TableCell> */}
                <TableCell className="flex items-center justify-center gap-2 sm:gap-4 whitespace-nowrap">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleCompareSn?.(sn, 0);
                      onOpenCompareMode();
                    }}
                    className="flex items-center gap-1 sm:gap-2 justify-center cursor-pointer"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/icons/ic_compare.svg"
                      alt="비교하기"
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                    <span className="text-xs sm:text-sm">결과비교</span>
                  </button>

                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>

    </div>
    
  );
};