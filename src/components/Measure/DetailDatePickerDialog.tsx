"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationButton,
  PaginationEllipsis,
  PaginationButtonPrevious,
  PaginationButtonNext,
} from "@/components/ui/pagination";
import { formatDate } from "@/utils/formatDate";
import { cn } from "@/lib/utils";
import type { DetailPagination } from "@/hooks/api/user/useMeasureListForDetail";
import { IUserMeasureListItem } from "@/types/user";
import { useLocale, useTranslations } from "next-intl";

const ITEMS_PER_PAGE = 10;

type MeasureDetailDatePickerDialogProps = {
  open: boolean;
  items: IUserMeasureListItem[];
  selectedMeasure?: number | null;
  onOpenChange: (v: boolean) => void;
  onSelect: (measureSn: number) => void;
  /** useMeasureListForDetail 연동 시 전달. 있으면 API 페이지네이션 사용 */
  pagination?: DetailPagination;
};

export const MeasureDetailDatePickerDialog = ({
  open,
  items,
  selectedMeasure,
  onOpenChange,
  onSelect,
  pagination: apiPagination,
}: MeasureDetailDatePickerDialogProps) => {
  const [localPage, setLocalPage] = useState(1);
  const t = useTranslations("Index");
  const locale = useLocale();
  const useApiPagination = !!apiPagination;
  const page = useApiPagination ? (apiPagination?.page ?? 1) : localPage;
  const lastPage = useApiPagination
    ? (apiPagination?.last_page ?? 1)
    : Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));
  const setPage = useApiPagination
    ? (p: number) => apiPagination?.setPage(Math.max(1, p))
    : (p: number) => setLocalPage(Math.max(1, Math.min(p, lastPage)));

  const displayItems = useApiPagination
    ? items
    : items.slice(
        (localPage - 1) * ITEMS_PER_PAGE,
        (localPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );

  useEffect(() => {
    if (open && !useApiPagination) setLocalPage(1);
  }, [open, useApiPagination]);

  const getMeasureTypeText = (measureItem: IUserMeasureListItem): string => {
    const labels: string[] = [];
    const hasBasic = measureItem.has_basic === 1;
    const hasRom = measureItem.has_rom === 1;
    const hasBia = measureItem.has_bia === 1;
    const hasGait = measureItem.has_gait === 1;
    const hasMoire = measureItem.has_moire === 1;
    if (hasBasic) labels.push(t("m_basic"));
    if (hasRom) labels.push(t("m_rom"));
    if (hasBia) labels.push(t("m_bia"));
    if (hasGait) labels.push(t("m_gait"));
    if (hasMoire) labels.push(t("m_moire"));
    return labels.length > 0 ? labels.join("/") : "";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full max-w-md rounded-2xl bg-white dark:bg-card p-4"
        aria-describedby={undefined}
      >
        <DialogTitle className="text-base font-semibold mb-3 text-foreground">
          {t("measure_date_picker")}
        </DialogTitle>

        <div className="max-h-[360px] overflow-auto">
          {items.length === 0 ? (
            <div className="flex items-center justify-center h-[200px] text-sm text-gray-400 dark:text-gray-500">
              {t("measure_date_picker_empty")}
            </div>
          ) : (
            <div className="space-y-2">
              {displayItems.map((it) => {
                const measureTypeText = getMeasureTypeText(it);
                const isError = !measureTypeText;
                const isWrongMeasure = it.isWrongMeasure === 1;

                return (
                  <button
                    key={it.measure_sn}
                    type="button"
                    disabled={isError}
                    className={cn(
                      "w-full text-left rounded-xl border px-3 py-2 transition-colors border-border text-foreground",
                      isError
                        ? "cursor-not-allowed opacity-50 bg-gray-50 dark:bg-white/5"
                        : "hover:bg-gray-50 dark:hover:bg-white/10 cursor-pointer",
                      selectedMeasure != null &&
                        selectedMeasure === it.measure_sn &&
                        "border-mainBlue-600 bg-sub100/50 dark:bg-mainBlue-100"
                    )}
                    onClick={() => {
                      if (isError) return;
                      onSelect(it.measure_sn);
                      onOpenChange(false);
                    }}
                  >
                    <div className="flex justify-between items-center w-full">
                      <div className="text-sm font-medium">
                        {formatDate(it.measure_date, locale)}
                      </div>

                      {/* 뱃지 영역 */}
                      {isError ? (
                        <div className="text-[10px] px-2 py-0.5 font-medium whitespace-nowrap text-danger bg-danger/20 border border-red-400 rounded-full">
                          측정오류
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <div className="text-[10px] px-1.5 font-medium whitespace-nowrap text-mainBlue-600 bg-mainBlue-100 border border-mainBlue-600 rounded-full">
                            {measureTypeText}
                          </div>
                          {isWrongMeasure && (
                            <span className="text-[10px] text-amber-600 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 px-1 py-0.2 rounded whitespace-nowrap">
                              (불완전 측정)
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {t("device_name")}: {it.device_name}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="mt-3 pt-3 border-t border-sub200 dark:border-border">
            <Pagination>
              <PaginationContent className="flex-wrap gap-1 justify-center">
                {page > 1 && (
                  <PaginationItem>
                    <PaginationButtonPrevious
                      onClick={() => setPage(page - 1)}
                    />
                  </PaginationItem>
                )}
                {page !== 1 && page - 1 > 1 && (
                  <PaginationItem>
                    <PaginationButton onClick={() => setPage(1)}>
                      1
                    </PaginationButton>
                  </PaginationItem>
                )}
                {page !== 1 && 1 < page - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                {page - 1 > 0 && (
                  <PaginationItem>
                    <PaginationButton onClick={() => setPage(page - 1)}>
                      {page - 1}
                    </PaginationButton>
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationButton isActive>{page}</PaginationButton>
                </PaginationItem>
                {lastPage > page && (
                  <PaginationItem>
                    <PaginationButton onClick={() => setPage(page + 1)}>
                      {page + 1}
                    </PaginationButton>
                  </PaginationItem>
                )}
                {lastPage > page + 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                {lastPage !== page && lastPage - 1 > page && (
                  <PaginationItem>
                    <PaginationButton onClick={() => setPage(lastPage)}>
                      {lastPage}
                    </PaginationButton>
                  </PaginationItem>
                )}
                {lastPage > page && (
                  <PaginationItem>
                    <PaginationButtonNext
                      onClick={() => setPage(page + 1)}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};