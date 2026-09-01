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
import { useLocale, useTranslations } from "next-intl";

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
  setCurrentTab?: (tab: viewType) => void;
  selectCompareSn?: (sn: number, slot: CompareSlot) => void;
  isMyPage: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Index");
  const locale = useLocale();

  const getMeasureTypeText = (measureItem: IUserMeasureListItem): string => {
    const labels: string[] = [];
    if (measureItem.has_basic === 1) labels.push(t('m_basic'));
    if (measureItem.has_rom === 1) labels.push(t('m_rom'));
    if (measureItem.has_bia === 1) labels.push(t('m_bia'));
    if (measureItem.has_gait === 1) labels.push(t('m_gait'));
    if (measureItem.has_moire === 1) labels.push(t('m_moire'));
    return labels.length > 0 ? labels.join("/") : "";
  };

  return (
    <div className="w-full table table-fixed min-w-0">
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/6 text-center text-xs sm:text-sm whitespace-nowrap">{t('m_history_col_date')}</TableHead>
              <TableHead className="w-1/6 text-center text-xs sm:text-sm whitespace-nowrap">{t('m_history_col_location')}</TableHead>
              <TableHead className="w-1/6 text-center text-xs sm:text-sm whitespace-nowrap">{t('m_history_col_device')}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {measures.map((measure) => {
              const sn = measure.measure_sn;
              const measureTypeText = getMeasureTypeText(measure);
              const isWrongMeasure = measure?.isWrongMeasure === 1; // 1이면 불완전 측정
              const isError = !measureTypeText; // 빈 문자열일 때만 클릭 불가(완전 오류)

              const handleRowClick = () => {
                if (isError || !setMeasureSn) return; // isError일 때만 차단, isWrongMeasure는 통과

                setMeasureSn(sn);

                let targetType: measureType = "basic";
                if (measure.has_basic === 1) {
                  targetType = "basic";
                } else if (measure.has_rom === 1) {
                  targetType = "rom";
                } else if (measure.has_bia === 1) {
                  targetType = "bia";
                } else if (measure.has_gait === 1) {
                  targetType = "gait";
                } else if (measure.has_moire === 1) {
                  targetType = "moire";
                }
                setMeasureType(targetType);

                const currentParams = new URLSearchParams(window.location.search);
                currentParams.set("subTab", "latest");

                if (setCurrentTab) setCurrentTab("latest");
                if (isMyPage) {
                  router.push(`${pathname}?${currentParams.toString()}`);
                } else {
                  router.push(`?${currentParams.toString()}`);
                }
              };

              return (
                <TableRow
                  key={sn}
                  onClick={isError ? undefined : handleRowClick}
                  className={
                    isError
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer hover:bg-sub100"
                  }
                >
                  <TableCell className="text-center text-xs sm:text-sm whitespace-nowrap">
                    {formatDate(measure.measure_date, locale)}
                  </TableCell>
                  <TableCell className="text-center font-medium text-xs sm:text-sm whitespace-nowrap">
                    {measure.center_name ?? "-"}
                  </TableCell>
                  <TableCell className="text-center text-xs sm:text-sm whitespace-nowrap">
                    {measure.device_name}
                  </TableCell>
                  <TableCell className="text-center">
                    {isError ? (
                      <div className="w-fit px-2 text-xs sm:text-sm text-center whitespace-nowrap text-danger bg-danger/30 border border-red-400 rounded-full mx-auto">
                        측정오류
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1.5 flex-wrap">
                        <div className="w-fit px-2 text-xs sm:text-sm text-center whitespace-nowrap text-mainBlue-600 dark:text-white bg-mainBlue-100 dark:bg-mainBlue-600 border border-mainBlue-600 rounded-full">
                          {measureTypeText}
                        </div>
                        {/* 불완전 측정 안내 뱃지/텍스트 */}
                        {isWrongMeasure && (
                          <span className="text-[11px] sm:text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 px-1.5 py-0.5 rounded whitespace-nowrap">
                            (불완전 측정)
                          </span>
                        )}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="flex items-center justify-end gap-2 sm:gap-4 whitespace-nowrap mr-4">
                    {measure.has_basic === 1 && !isError && (
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
                        <span className="text-xs sm:text-sm">{t("m_history_compare")}</span>
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