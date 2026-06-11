import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CompareSlot } from "@/types/compare";
import { IUserMeasureListItem } from "@/types/user";
import { formatDate } from "@/utils/formatDate";
import { useRouter } from "next/navigation";

export const CenterUserMeasureList = ({
  measures,
  changeMeasure,
  selectCompareSn,
}: {
  measures: IUserMeasureListItem[];
  changeMeasure: (measureSn: number) => void;
  selectCompareSn?: (sn: number, slot: CompareSlot) => void;
  isMyPage: boolean;
}) => {
  const router = useRouter();
  const getMeasureTypeText = (measureItem: IUserMeasureListItem): string => {
    const labels: string[] = [];
    const hasBasic = measureItem.has_basic === 1;
    const hasRom = measureItem.has_rom === 1;
    const hasBia = measureItem.has_bia === 1;
    if (hasBasic) labels.push("기본 검사");
    if (hasRom) labels.push("ROM");
    if (hasBia) labels.push("체성분")
    return labels.length > 0 ? labels.join("/") : "";
  };

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
                  router.push(`?tab=latest`);
                }
                 : undefined}
                className={"cursor-pointer hover:bg-sub100"}
              >

                <TableCell className="text-center text-xs sm:text-sm whitespace-nowrap">{formatDate(measure.measure_date)}</TableCell>
                <TableCell className="text-center font-medium text-xs sm:text-sm whitespace-nowrap">
                  {measure.center_name ?? "-"}
                </TableCell>
                <TableCell className="text-center text-xs sm:text-sm whitespace-nowrap">{measure.device_name}</TableCell>
                <TableCell className="text-center">
                  <div className="w-fit px-2 text-xs sm:text-sm text-center whitespace-nowrap text-mainBlue-600 dark:text-white bg-mainBlue-600-background dark:bg-mainBlue-600 border border-mainBlue-600 rounded-full mx-auto">
                    {getMeasureTypeText(measure)}
                  </div>
                </TableCell>
                <TableCell className="flex items-center justify-end gap-2 sm:gap-4 whitespace-nowrap mr-4">
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