"use client";

import React, { useMemo, useState } from "react";
import { CenterUserMeasureList } from "@/components/User/CenterUserMeasureList";
import CenterUserMeasureListSkeleton from "@/components/User/CenterUserMeasureListSkeleton";
import CustomPagination from "@/components/common/Pagination";
import { useGetUserMeasureList } from "@/hooks/api/user/useGetUserMeasureList";
import { useQueryParams } from "@/hooks/utils/useQueryParams";
import { IUserMeasureList } from "@/types/user";
import DataError from "@/components/Util/DataError";
import { CompareSlot } from "@/types/compare";
import { IMeasureList } from "@/types/measure";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";

const CenterUserMeasureListContainer = ({ 
  // userUUID,
  userSn,
  onSelectMeasure,
  onToggleCompareSn, 
  onOpenCompareMode,
  isResultPage = false,
  
}: { 
  // userUUID: string;
  userSn: number;
  onSelectMeasure?: (measureSn: number) => void;
  onToggleCompareSn: (sn: number, slot: CompareSlot) => void;
  onOpenCompareMode: () => void;
  isResultPage: boolean;
}) => {
  const { setQueryParam, query } = useQueryParams();
  const page = query.page || "1";
  const limit = query.limit || "20";
  const sort = query.sort || "desc"; // ✅ 추가
  const from = query.from; // ✅ 추가
  const to = query.to; // ✅ 추가
  // 3가지 조건들을 적용해서 리스트에 들어갈 데이터를 필터링해주는 곳
  const {
    data: userMeasureList,
    isLoading,
    isError,
  } = useGetUserMeasureList<IUserMeasureList>({
    page,
    limit,
    // user_uuid: userUUID,
    user_sn: userSn,
    from,
    to,
    sort,
    isResultPage,
  });

  const handleSelectChange = (value: string) => {
      setQueryParam([
        ["limit", value],
        ["page", "1"],
      ]);
    };
  const defaultLimit = query.limit || 20;
  
  // const [deleteSelectedSns, ] = useState<number[]>([]); // setDeleteSelectedSns
  // const onToggleDeleteSn = (sn: number) => {
  //   setDeleteSelectedSns((prev) =>
  //     prev.includes(sn)
  //       ? prev.filter((x) => x !== sn)
  //       : [...prev, sn]
  //   );
  // };

  // query에서 날짜 범위 가져오기
  // 달력 범위 (임시 상태)
  const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>(() => {
    if (from && to) {
      return {
        from: new Date(from),
        to: new Date(to),
      };
    }
    return undefined;
  });

  // Popover 열림 상태
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isNewSelection, setIsNewSelection] = useState(false);
  const handleDateSelect = (range: DateRange | undefined) => {
    // range가 undefined면 그냥 설정
    if (!range) {
      setTempDateRange(undefined);
      setIsNewSelection(false);
      return;
    }

    if (range.from && !range.to) {
      // ✅ 이미 완성된 범위가 있고, 새로운 날짜를 클릭한 경우
      if (tempDateRange?.from && tempDateRange?.to && !isNewSelection) {
        // 기존 범위를 초기화하고 새로 시작
        setTempDateRange({ from: range.from, to: undefined });
        setIsNewSelection(true);
      } else {
        setTempDateRange(range);
      }
      return;
    }

    // from과 to가 모두 있는 경우 (범위 선택 완료)
    if (range.from && range.to) {
      setTempDateRange(range);
      setIsNewSelection(false); // 선택 완료되면 플래그 리셋
      return;
    }

    setTempDateRange(range);
  };

    // ✅ Popover가 열릴 때 적용된 날짜로 초기화
  const handlePopoverOpenChange = (open: boolean) => {
    if (open) {
      // Popover 열 때 현재 적용된 날짜로 초기화
      if (from && to) {
        setTempDateRange({
          from: new Date(from),
          to: new Date(to),
        });
      }
      setIsNewSelection(false); // 새 선택 플래그 리셋
    }
    setIsPopoverOpen(open);
  };

  // 날짜 범위 적용
  const handleApplyDateRange = () => {
    if (tempDateRange?.from && tempDateRange?.to) {
      setQueryParam([
        ["from", format(tempDateRange.from, "yyyy-MM-dd")],
        ["to", format(tempDateRange.to, "yyyy-MM-dd")],
        ["page", "1"],
      ]);
    } else if (tempDateRange?.from) {
      // 시작일만 선택된 경우
      setQueryParam([
        ["from", format(tempDateRange.from, "yyyy-MM-dd")],
        ["page", "1"],
      ]);
    }
    setIsPopoverOpen(false);
    setIsNewSelection(false);
  };

  // 날짜 범위 초기화
  const handleResetDateRange = () => {
    setTempDateRange(undefined);
    setIsNewSelection(false);
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.delete("from");
    currentParams.delete("to");
    
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${currentParams.toString()}`
    );
    setIsPopoverOpen(false);
  };

  // 현재 적용된 날짜 범위 (표시용)
  const appliedDateRange = from && to ? {
    from: new Date(from),
    to: new Date(to),
  } : undefined;

  const measurements: IMeasureList[] = useMemo(() => {
    if (!userMeasureList?.measurement_list) return [];
    
    // IUserMeasureListItem[]를 IMeasureList[]로 변환
    return userMeasureList.measurement_list.map((item) => ({
      sn: item.measure_sn,
      measure_sn: item.measure_sn,
      user_name: item.user_name,
      device_name: item.device_name,
      measure_date: item.measure_date,
      mobile: item.mobile,
      user_sn: item.user_sn,
      user_uuid: "",
      device_sn: 0,
      t_score: 0,
    }));
  }, [userMeasureList?.measurement_list]);
  
  const handleSortChange = (value: string) => {
    setQueryParam([
      ["sort", value], // ✅ "asc" 또는 "desc" 그대로 전달
      ["page", "1"]
    ]);
  };


  if (isError) {
    return <DataError />;
  }

  return (
  <>
    {/* ✅ 삭제 버튼 영역 (항상 공간 확보) */}
    <div className="flex items-center justify-end mb-2 w-full">

      {/* <div className="flex items-center gap-4 h-12">
        <button
          type="button"
          className={cn(
            "px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium transition",
            deleteSelectedSns.length > 0
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          )}
          onClick={() => {

          }}
        >
          선택 삭제
        </button>
        <span
          className={cn(
            "px-4 py-2 text-sm font-medium transition",
            deleteSelectedSns.length > 0
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          )}
        >
          {deleteSelectedSns.length}개가 선택됨
        </span>
      </div> */}

      <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-2 sm:gap-4 w-full">
        <div className="flex items-center gap-4 justify-end sm:justify-start">
          <Select
            onValueChange={handleSelectChange}
            defaultValue={defaultLimit.toString()}
          >
            <SelectTrigger className="max-w-[120px]">
              <SelectValue placeholder="행 갯수" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10건</SelectItem>
              <SelectItem value="20">20건</SelectItem>
              <SelectItem value="50">50건</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={handleSortChange}
            defaultValue={sort}
          >
            <SelectTrigger className="max-w-[120px]">
              <SelectValue placeholder="최신순" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">최신순</SelectItem>
              <SelectItem value="asc">오래된순</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Popover open={isPopoverOpen} onOpenChange={handlePopoverOpenChange}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-fit justify-start text-left font-normal",
                !appliedDateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {appliedDateRange?.from ? (
                appliedDateRange.to ? (
                  <>
                    {format(appliedDateRange.from, "PPP", { locale: ko })} -{" "}
                    {format(appliedDateRange.to, "PPP", { locale: ko })}
                  </>
                ) : (
                  format(appliedDateRange.from, "PPP", { locale: ko })
                )
              ) : (
                <span>날짜 범위 선택</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={tempDateRange?.from}
              selected={tempDateRange}
              onSelect={handleDateSelect}  // ✅ 커스텀 핸들러 사용
              numberOfMonths={2}
              locale={ko}
            />
            {/* 하단 버튼 영역 */}
            <div className="flex justify-end gap-2 p-3 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetDateRange}
              >
                초기화
              </Button>
              <Button
                size="sm"
                onClick={handleApplyDateRange}
                disabled={!tempDateRange?.from}
                className="bg-secondary text-secondary-foreground"
              >
                적용
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
    
    {isLoading ? (
      <CenterUserMeasureListSkeleton />
    ) : (
      <>
        {/* 총 갯수 표시 */}
        {userMeasureList && (
          <div className="mb-4 text-sm text-muted-foreground">
            총 <span className="font-semibold text-foreground">{userMeasureList.total}</span>건
          </div>
        )}
        
        <CenterUserMeasureList
          measures={measurements}
          onRowClick={onSelectMeasure ? (sn) => onSelectMeasure(sn) : undefined}
          onToggleCompareSn={onToggleCompareSn}
          onOpenCompareMode={onOpenCompareMode}
        />

        {userMeasureList && (
          <CustomPagination
            total={userMeasureList.total}
            page={userMeasureList.current_page}
            last_page={userMeasureList.total_pages}
            limit={userMeasureList.per_page}
          />
        )}
      </>
    )}
  </>
);
};

export default CenterUserMeasureListContainer;
