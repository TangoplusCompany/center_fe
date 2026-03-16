"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OptionBar from "@/components/Util/OptionBar";

interface CenterUserPageSkeletonProps {
  adminRole: number;
}

const CenterUserPageSkeleton = ({ adminRole }: CenterUserPageSkeletonProps) => {
  // 작동하지 않게 하기 위한 빈 함수들
  const noop = () => {};
  const noopDialog = () => {};

  return (
    <div className="col-span-12 flex flex-col gap-5">
      {/* OptionBar - 작동하지 않게 설정 */}
      <div className="pointer-events-none opacity-50">
        <OptionBar 
          totalItems={0} 
          search="" 
          onSearchChange={noop}
          showAddButton={adminRole < 3}
          setDialogOpen={noopDialog}
        />
      </div>

      {/* UserList 테이블 스켈레톤 */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center w-[100px]">이름</TableHead>
            <TableHead className="text-center">전화번호</TableHead>
            <TableHead className="text-center">이메일</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell className="text-center">
                <div className="h-5 w-16 mx-auto bg-gray-200 rounded" />
              </TableCell>
              <TableCell className="text-center">
                <div className="h-5 w-24 mx-auto bg-gray-200 rounded" />
              </TableCell>
              <TableCell className="text-center">
                <div className="h-5 w-32 mx-auto bg-gray-200 rounded" />
              </TableCell>
              <TableCell className="flex mr-4 items-center justify-end gap-6">
                {/* 상세보기 버튼 스켈레톤 - UserList와 동일한 구조 */}
                <div className="flex items-center gap-2 justify-end cursor-pointer">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-5 w-20" />
                </div>
                {/* 제거 버튼 스켈레톤 - UserList와 동일한 구조 */}
                {adminRole < 3 && (
                  <div className="flex items-center gap-2 justify-end cursor-pointer">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-5 w-12" />
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination 스켈레톤 */}
      <div className="flex items-center justify-center gap-2">
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
      </div>
    </div>
  );
};

export default CenterUserPageSkeleton;
