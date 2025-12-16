"use client";

import React, { useState } from "react";
import { CenterUserMeasureList } from "@/components/User/CenterUserMeasureList";
import CustomPagination from "@/components/common/Pagination";
import { useGetUserMeasureList } from "@/hooks/api/user/useGetUserMeasureList";
import { useQueryParams } from "@/hooks/utils/useQueryParams";
import { IUserMeasureList } from "@/types/user";
import DataError from "@/components/Util/DataError";
import { CompareSlot } from "@/types/compare";
const CenterUserMeasureListContainer = ({ 
  userUUID,
  onSelectMeasure,
  onToggleCompareSn, 
  onOpenCompareMode,
  
}: { 
  userUUID: string;
  onSelectMeasure?: (measureSn: number) => void;
  onToggleCompareSn: (sn: number, slot: CompareSlot) => void;
  onOpenCompareMode: () => void;
}) => {
  const { query } = useQueryParams();
  const page = query.page || "1";
  const limit = query.limit || "20";

  const {
    data: userMeasureList,
    isLoading,
    isError,
  } = useGetUserMeasureList<IUserMeasureList>({
    page,
    limit,
    user_uuid: userUUID,
  });

  const [deleteSelectedSns, setDeleteSelectedSns] = useState<number[]>([]);

  const onToggleDeleteSn = (sn: number) => {
    setDeleteSelectedSns((prev) =>
      prev.includes(sn)
        ? prev.filter((x) => x !== sn)
        : [...prev, sn]
    );
  };
  if (isLoading) {
    return <p className="text-center py-8">로딩 중...</p>;
  }

  if (isError) {
    return <DataError />;
  }

  if (!userMeasureList || userMeasureList.measurements.length === 0) {
    return (
      <>
        <CenterUserMeasureList 
          measures={[]}
          deleteSelectedSns={[]} 
          onToggleDeleteSn={onToggleDeleteSn}
          onOpenCompareMode={onOpenCompareMode}
        />
        <CustomPagination total={0} page={1} last_page={1} limit={parseInt(limit)} />
      </>
    );
  }

  return (
  <>
    {/* ✅ 삭제 버튼 영역 (항상 공간 확보) */}
    <div className="flex items-center justify-end h-12 mb-2 gap-4">
      <span className={
        `w-1/6 px-4 py-2 text-primary-foreground text-sm font-medium transition flex items-center justify-center
        ${deleteSelectedSns.length > 0
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"}
        `}
      >{deleteSelectedSns.length}개가 선택됨</span>
      <button
        type="button"
        className={`px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium transition
          ${deleteSelectedSns.length > 0
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"}
        `}
        onClick={() => {
          console.log("삭제 대상:", deleteSelectedSns);
        }}
      >
        선택 삭제
      </button>
    </div>

    <CenterUserMeasureList
      measures={userMeasureList.measurements}
      onRowClick={(sn) => onSelectMeasure?.(sn)}
      deleteSelectedSns={deleteSelectedSns}
      onToggleDeleteSn={onToggleDeleteSn}
      onToggleCompareSn={onToggleCompareSn}
      onOpenCompareMode={onOpenCompareMode}
    />

    <CustomPagination
      total={userMeasureList.total}
      page={userMeasureList.page}
      last_page={userMeasureList.last_page}
      limit={userMeasureList.limit}
    />
  </>
);
};

export default CenterUserMeasureListContainer;
