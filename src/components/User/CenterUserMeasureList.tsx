import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { phoneHyphen } from "@/utils/regexFiltering";
import { IMeasureList } from "@/types/measure";
import { CompareSlot } from "@/types/compare";

export const CenterUserMeasureList = ({
  measures,
  onRowClick,
  deleteSelectedSns,
  onToggleDeleteSn,
  onToggleCompareSn,
  onOpenCompareMode,
}: {
  measures: IMeasureList[];
  onRowClick?: (measureSn: number) => void;

  deleteSelectedSns: number[];
  onToggleDeleteSn: (sn: number) => void;
  onToggleCompareSn?: (sn: number, slot: CompareSlot) => void;
  onOpenCompareMode: () => void;
}) => {
  

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {/* ✅ 체크박스 컬럼 */}
          <TableHead className="w-10 text-center"></TableHead>

          <TableHead className="text-center">이름</TableHead>
          <TableHead className="text-center">전화번호</TableHead>
          <TableHead className="text-center">측정 일자</TableHead>
          <TableHead className="text-center">측정 기기</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {measures.map((measure) => {
          const sn = measure.measure_sn;
          const checked = deleteSelectedSns.includes(sn);

          return (
            <TableRow key={sn}>
              {/* ✅ 삭제 선택 체크박스 */}
              <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleDeleteSn(sn)}
                />
              </TableCell>

              <TableCell className="text-center font-medium">
                {measure.user_name}
              </TableCell>
              <TableCell className="text-center">{phoneHyphen(measure.mobile)}</TableCell>
              <TableCell className="text-center">{measure.measure_date}</TableCell>
              <TableCell className="text-center">{measure.device_name}</TableCell>

              <TableCell className="flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={() => onRowClick?.(sn)}
                  className="flex items-center gap-2 justify-end cursor-pointer"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/icons/ic_paper_detail.svg"
                    alt="상세보기"
                    className="w-5 h-5 gap-4"
                  />
                  <span>상세보기</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleCompareSn?.(sn, 0);
                    onOpenCompareMode();
                  }}
                  className="flex items-center gap-2 justify-end cursor-pointer"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/icons/ic_compare.svg"
                    alt="비교하기"
                    className="w-5 h-5 gap-4"
                  />
                  <span>결과비교</span>
                </button>

              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
