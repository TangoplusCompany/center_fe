import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CompareSlot } from "@/types/compare";
import { UserDpMode } from "./CenterUserDetail";
import { IUserMeasureListItem } from "@/types/user";

export const CenterUserMeasureList = ({
  measures,
  changeMeasure,
  selectCompareSn,
  changeDpMode,
}: {
  measures: IUserMeasureListItem[];
  changeMeasure?: (measureSn: number) => void;
  selectCompareSn?: (sn: number, slot: CompareSlot) => void;
  changeDpMode : (dpMode: UserDpMode) => void;
}) => {
  const measureTypeMap : Record<string, string> = {
    rom_only : "ROM",
    basic_only : "기본 검사",
    basic_and_rom : "기본 검사/ROM"
  }

  return (
    <div className="w-full table table-fixed min-w-0">
      <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/6 text-center text-xs sm:text-sm whitespace-nowrap">측정 일자</TableHead>
            <TableHead className="w-1/6 text-center text-xs sm:text-sm whitespace-nowrap">측정 위치</TableHead>
            <TableHead className="w-1/6 text-center text-xs sm:text-sm whitespace-nowrap">측정 기기</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {measures.map((measure) => {
            const sn = measure.measure_sn;
            // const checked = deleteSelectedSns.includes(sn);

            return (
              <TableRow 
                key={sn} 
                onClick={changeMeasure ? () => {
                  changeMeasure(sn)
                  changeDpMode(measure.has_basic === 1 ? "detail" : "rom")
                  
                }
                 : undefined}
                className={changeMeasure ? "cursor-pointer hover:bg-sub100" : ""}
              >

                <TableCell className="text-center text-xs sm:text-sm whitespace-nowrap">{measure.measure_date}</TableCell>
                <TableCell className="text-center font-medium text-xs sm:text-sm whitespace-nowrap">
                  {measure.center_name ?? "-"}
                </TableCell>
                <TableCell className="text-center text-xs sm:text-sm whitespace-nowrap">{measure.device_name}</TableCell>
                <TableCell className="text-center">
                  <div className="w-fit px-2 text-xs sm:text-sm text-center whitespace-nowrap text-toggleAccent bg-toggleAccent-background border border-toggleAccent rounded-full mx-auto">
                    {measureTypeMap[measure.measurement_type]}
                  </div>
                </TableCell>
                <TableCell className="flex items-center justify-end gap-2 sm:gap-4 whitespace-nowrap">
                  {measure.has_basic === 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        selectCompareSn?.(sn, 0);
                        
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
                  )}

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