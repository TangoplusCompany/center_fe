"use client";

import React from "react";
import { CenterUserMeasureList } from "@/components/User/MeasureList";
import CenterUserMeasureListSkeleton from "@/components/User/MeasureListSkeleton";
import { CompareSlot } from "@/types/compare";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import CustomPagination from "../common/Pagination";
import { measureType, viewType } from "./Detail";
import { IUserMeasureList } from "@/types/user";

const CenterUserMeasureListContainer = ({ 
  userMeasureList,
  handleSortChange,
  sort,
  setMeasureSn,
  setMeasureType,
  setCurrentTab,
  selectCompareSn, 
  isMyPage = false,
  isListLoading,
}: { 
  userMeasureList : IUserMeasureList,
  handleSortChange: (value : string) => void;
  sort: string;
  setMeasureSn: (measureSn: number) => void;
  setMeasureType: (mt: measureType) => void;
  setCurrentTab ?: (tab : viewType) => void;
  selectCompareSn: (sn: number, slot: CompareSlot) => void;
  isMyPage: boolean;
  isListLoading: boolean;
}) => {
  
  return (
    <>
      {/* ✅ 삭제 버튼 영역 (항상 공간 확보) */}
      <div className="flex items-center justify-end mb-2 w-full">

        <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-2 sm:gap-4 w-full">
          <div className="flex w-full justify-between items-center">
            {/* 총 갯수 표시 */}
            {userMeasureList && (
              <div className="text-base text-sub800 dark:text-sub100 ">
                총 <span className="font-semibold text-black dark:text-white">{userMeasureList.total}</span>건
              </div>
            )}
            <div className="flex items-center gap-4 ">

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
          </div>
        </div>
      </div>
    
    {isListLoading ? (
      <CenterUserMeasureListSkeleton />
      ) : (
        userMeasureList && (
          <>
            <CenterUserMeasureList
              measures={userMeasureList.measurement_list ?? []}
              setMeasureSn={setMeasureSn}
              setMeasureType={setMeasureType}
              setCurrentTab={setCurrentTab}
              selectCompareSn={selectCompareSn}
              isMyPage={isMyPage}
            />
            <CustomPagination
              total={userMeasureList.total}
              page={userMeasureList.current_page}
              last_page={userMeasureList.total_pages}
              limit={userMeasureList.limit}
            /> 
          </>
        )
      )}
    </>
);
};

export default CenterUserMeasureListContainer;
