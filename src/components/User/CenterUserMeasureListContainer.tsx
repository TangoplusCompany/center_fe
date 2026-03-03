"use client";

import React from "react";
import { CenterUserMeasureList } from "@/components/User/CenterUserMeasureList";
import CenterUserMeasureListSkeleton from "@/components/User/CenterUserMeasureListSkeleton";
import { useGetUserMeasureList } from "@/hooks/api/user/useGetUserMeasureList";
import { useQueryParams } from "@/hooks/utils/useQueryParams";
import { IUserMeasureList } from "@/types/user";
import DataError from "@/components/Util/DataError";
import { CompareSlot } from "@/types/compare";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { viewType } from "./CenterUserDetail";
import CustomPagination from "../common/Pagination";

const CenterUserMeasureListContainer = ({ 
  userSn,
  changeMeasure,
  changeView,
  selectCompareSn, 
  isResultPage = false,
  
}: { 
  userSn: number;
  changeMeasure?: (measureSn: number) => void;
  changeView: (dpView: viewType) => void;
  selectCompareSn: (sn: number, slot: CompareSlot) => void;
  isResultPage: boolean;
}) => {
  const { setQueryParam, query } = useQueryParams();
  const page = query.page || "1";
  const limit = query.limit || "20";
  const sort = query.sort || "desc";
  const from = query.from;
  const to = query.to;

  const {
    data: userMeasureList,
    isLoading,
    isError,
  } = useGetUserMeasureList<IUserMeasureList>({
    page,
    limit,
    user_sn: userSn,
    from,
    to,
    sort,
    isResultPage,
  });
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

      <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-2 sm:gap-4 w-full">
        <div className="flex w-full justify-between items-center">
          {/* 총 갯수 표시 */}
          {userMeasureList && (
            <div className="text-base text-muted-foreground ">
              총 <span className="font-semibold text-foreground">{userMeasureList.total}</span>건
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
    
    {isLoading ? (
      <CenterUserMeasureListSkeleton />
        ) : (
          userMeasureList && (
            <>
              <CenterUserMeasureList
                measures={userMeasureList?.measurement_list ?? []}
                changeMeasure={changeMeasure ? (sn) => changeMeasure(sn) : undefined}
                selectCompareSn={selectCompareSn}
                changeView={changeView}
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
