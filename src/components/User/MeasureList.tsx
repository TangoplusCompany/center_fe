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
import { usePathname, useRouter } from "next/navigation";
import { measureType, viewType } from "./Detail";

export const CenterUserMeasureList = ({
  measures,
  setMeasureSn,
  setMeasureType,
  setCurrentTab,
  selectCompareSn,
  isMyPage,
}: {
  measures: IUserMeasureListItem[];
  setMeasureSn: (measureSn: number) => void;
  setMeasureType: (tab: measureType) => void;
  setCurrentTab ?: (tab : viewType) => void;
  selectCompareSn?: (sn: number, slot: CompareSlot) => void;
  isMyPage: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
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
                onClick={setMeasureSn ? () => {
                  setMeasureSn(sn)
                  
                  let targetType: measureType = "basic"; 
                  if (measure.has_basic === 1) {
                    targetType = "basic";
                  } else if (measure.has_rom === 1) {
                    targetType = "rom";
                  } else if (measure.has_bia === 1) {
                    targetType = "bia";
                  }
                  setMeasureType(targetType);
                  const currentParams = new URLSearchParams(window.location.search);
                  currentParams.set("subTab", "latest"); // 원하는 탭 파라미터명에 맞게 세팅 (subTab 또는 tab)

                  if (setCurrentTab) setCurrentTab("latest")
                  if (isMyPage) {
                    // 마이페이지일 때는 기존 pathname 유지 + 업데이트된 파라미터
                    router.push(`${pathname}?${currentParams.toString()}`);
                  } else {
                    // 마이페이지가 아닐 때도 기존 파라미터를 유지한 채 이동
                    router.push(`?${currentParams.toString()}`);
                  }
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
                  <div className="w-fit px-2 text-xs sm:text-sm text-center whitespace-nowrap text-mainBlue-600 dark:text-white bg-mainBlue-100  dark:bg-mainBlue-900 dark:bg-mainBlue-600 border border-mainBlue-600 rounded-full mx-auto">
                    {getMeasureTypeText(measure)}
                  </div>
                </TableCell>
                <TableCell className="flex items-center justify-end gap-2 sm:gap-4 whitespace-nowrap mr-4">
                  {/* TODO ROM도 비교가 가능해질 경우 여기 분기처리 변경 */}
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