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
import { ComparePair, CompareSlot } from "@/types/compare";
import { IUserMeasureListItem } from "@/types/user";
import { formatDate } from "@/utils/formatDate";
import type { ComparePagination } from "@/hooks/api/user/useMeasureListForCompare";
import { useLocale, useTranslations } from "next-intl";
import { AlertCircle } from "lucide-react";
import { MeasureType } from "@/types/measure";

type MeasurePickerDialogProps = {
  open: boolean;
  items: (IUserMeasureListItem & { isWrongMeasure?: 0 | 1; isWrongMeasre?: 0 | 1 })[];
  comparePair: ComparePair;
  activeSlot: CompareSlot;
  onOpenChange: (v: boolean) => void;
  selectCompareSn: (measureSn: number, slot: CompareSlot) => void;
  compareType: MeasureType | undefined;
  pagination?: ComparePagination;
};

const COMPARE_TYPE_MAP = {
  basic: "compare_type_basic",
  rom: "compare_type_rom",
  bia: "compare_type_bia",
  gait: "compare_type_gait",
  moire: "compare_type_moire",
} as const;

export const MeasurePickerDialog = ({
  open,
  items,
  comparePair,
  activeSlot,
  onOpenChange,
  selectCompareSn,
  compareType,
  pagination: apiPagination,
}: MeasurePickerDialogProps) => {
  const t = useTranslations("Index");
  const locale = useLocale();
  const [localPage, setLocalPage] = useState(1);

  const useApiPagination = !!apiPagination;
  const filteredItems = items.filter(
    (it) => !comparePair.includes(it.measure_sn)
  );

  const page = useApiPagination ? (apiPagination?.page ?? 1) : localPage;
  const itemsPerPage = useApiPagination ? (apiPagination?.limit ?? 2) : 10;
  const lastPage = useApiPagination
    ? (apiPagination?.last_page ?? 1)
    : Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));

  const setPage = useApiPagination
    ? (p: number) => apiPagination?.setPage(Math.max(1, p))
    : (p: number) => setLocalPage(Math.max(1, Math.min(p, lastPage)));

  const displayItems = useApiPagination
    ? filteredItems
    : filteredItems.slice(
        (localPage - 1) * itemsPerPage,
        (localPage - 1) * itemsPerPage + itemsPerPage
      );

  useEffect(() => {
    if (open && !useApiPagination) setLocalPage(1);
  }, [open, useApiPagination]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md rounded-2xl bg-white dark:bg-card p-4" aria-describedby={undefined}>
        {/* 헤더 */}
        <div className="flex flex-col gap-0.5 mb-3">
          <DialogTitle className="text-base font-semibold text-foreground">
            {compareType ? t("compare_picker_title") : t("measure_date_picker")}
          </DialogTitle>
          {compareType && compareType in COMPARE_TYPE_MAP && (
            <p className="text-sm text-sub600 dark:text-sub500 font-normal">
              {t("compare_test_item_label")}: {t(COMPARE_TYPE_MAP[compareType])}
            </p>
          )}
        </div>

        {/* 내용 영역 */}
        <div className="max-h-[360px] overflow-auto">
          {filteredItems.length === 0 ? (
            <div className="flex items-center justify-center h-[200px] text-sm text-gray-400 dark:text-gray-500">
              {t("measure_no_compare")}
            </div>
          ) : (
            <div className="space-y-2">
              {displayItems.map((it) => {
                const isError = (it.isWrongMeasure ?? it.isWrongMeasre) === 1;

                return (
                  <button
                    key={it.measure_sn}
                    type="button"
                    disabled={isError}
                    className={`w-full flex items-center justify-between text-left rounded-xl border border-border px-3 py-2 transition-colors ${
                      isError
                        ? "cursor-not-allowed opacity-50 bg-gray-50 dark:bg-zinc-800/50"
                        : "cursor-pointer hover:bg-gray-50 dark:hover:bg-white/10 text-foreground"
                    }`}
                    onClick={() => {
                      if (isError) return;
                      selectCompareSn(it.measure_sn, activeSlot);
                      onOpenChange(false);
                    }}
                  >
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {formatDate(it.measure_date, locale)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {t("device_name")}: {it.device_name}
                      </div>
                    </div>

                    {isError && (
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-md shrink-0">
                        <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span>{t("measure_error")}</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {filteredItems.length > 0 && (
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
                    <PaginationButton onClick={() => setPage(1)}>1</PaginationButton>
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