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
import { IMeasureList } from "@/types/measure";
import { formatDate } from "@/utils/formatDate";
import { cn } from "@/lib/utils";
import type { DetailPagination } from "@/hooks/api/user/useMeasureListForDetail";

const ITEMS_PER_PAGE = 10;

type MeasureDetailDatePickerDialogProps = {
  open: boolean;
  items: IMeasureList[];
  selectedMeasureSn?: number | null;
  onOpenChange: (v: boolean) => void;
  onSelect: (measureSn: number) => void;
  /** useMeasureListForDetail 연동 시 전달. 있으면 API 페이지네이션 사용 */
  pagination?: DetailPagination;
};

export const MeasureDetailDatePickerDialog = ({
  open,
  items,
  selectedMeasureSn,
  onOpenChange,
  onSelect,
  pagination: apiPagination,
}: MeasureDetailDatePickerDialogProps) => {
  const [localPage, setLocalPage] = useState(1);

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md rounded-2xl bg-white p-4" aria-describedby={undefined}>
        <DialogTitle className="text-base font-semibold mb-3">
          측정 목록 선택
        </DialogTitle>

        <div className="max-h-[360px] overflow-auto">
          {items.length === 0 ? (
            <div className="flex items-center justify-center h-[200px] text-sm text-gray-400">
              측정 목록이 없습니다.
            </div>
          ) : (
            <div className="space-y-2">
              {displayItems.map((it) => (
                <button
                  key={it.measure_sn}
                  type="button"
                  className={cn(
                    "w-full text-left rounded-xl border px-3 py-2 hover:bg-gray-50 transition-colors",
                    selectedMeasureSn != null &&
                      selectedMeasureSn === it.measure_sn &&
                      "border-toggleAccent bg-sub100/50"
                  )}
                  onClick={() => {
                    onSelect(it.measure_sn);
                    onOpenChange(false);
                  }}
                >
                  <div className="text-sm font-medium">
                    {formatDate(it.measure_date)}
                  </div>
                  <div className="text-xs text-gray-500">
                    장치이름: {it.device_name}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {items.length > 0  && (
          <div className="mt-3 pt-3 border-t border-sub200">
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
