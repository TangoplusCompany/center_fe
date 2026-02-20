import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Pagination, PaginationButton, PaginationButtonNext, PaginationButtonPrevious, PaginationContent, PaginationEllipsis, PaginationItem } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { ComparePair, CompareSlot } from "@/types/compare";
import { IMeasureROMItem } from "@/types/measure";
import { formatDate } from "@/utils/formatDate";

import { useEffect, useState } from "react";
export interface ComparePagination {
  page: number;
  limit: number;
  last_page: number;
  setPage: (page: number) => void;
}

export interface ROMPickerDialogProps {
  open: boolean;
  items: IMeasureROMItem[];
  title: string;
  comparePair: ComparePair;
  activeSlot: CompareSlot;
  onOpenChange: (v: boolean) => void;
  onToggleCompareSn: (measureSn : number, slot: CompareSlot) => void;
  pagination?: ComparePagination;
  isLoading: boolean;
  isError: boolean;
}

export const ROMPickerDialog = ({
  open,
  items,
  title,
  comparePair,
  activeSlot,
  onOpenChange,
  onToggleCompareSn,
  pagination: apiPagination,
  isLoading,
  isError
}: ROMPickerDialogProps) => {
  const [localPage, setLocalPage] = useState(1);
  const useApiPagination = !!apiPagination;
  
  const filteredItems = items.filter((it) =>
    !comparePair.includes(it.sn)
  );

  const page = useApiPagination ? (apiPagination?.page ?? 1) : localPage;
  // API 페이지네이션 사용 시: API limit 사용, 로컬 페이지네이션 사용 시: 10개씩
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
        <DialogTitle className="text-base font-semibold mb-3 text-foreground">
         이전 기록: {title}
        </DialogTitle>
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="w-full h-64 rounded-xl" />
            <Skeleton className="w-full h-64 rounded-xl" />
            <Skeleton className="w-full h-64 rounded-xl" />
            <Skeleton className="w-full h-64 rounded-xl" />
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center h-[200px] text-sm text-red-400">
            오류가 발생했습니다. 잠시후 다시 시도해주세요.
          </div>
        ) : (
          <div className="max-h-[360px] overflow-auto">
            {filteredItems.length === 0 ? (
              <div className="flex items-center justify-center h-[200px] text-sm text-gray-400 dark:text-gray-500">
                선택할 항목이 없습니다.
              </div>
            ) : (
              <div className="space-y-2">
                {displayItems.map((it) => (
                  <button
                    key={it.sn}
                    type="button"
                    className="w-full text-left rounded-xl border border-border px-3 py-2 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors text-foreground"
                    onClick={() => {
                      onToggleCompareSn(it.sn, activeSlot);
                      onOpenChange(false);
                    }}
                  >
                    <div className="text-sm font-medium">
                      {formatDate(it.reg_date)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      더미입니다.
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        
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

export default ROMPickerDialog;