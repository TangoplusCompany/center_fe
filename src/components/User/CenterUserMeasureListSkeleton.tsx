"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const CenterUserMeasureListSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center text-xs sm:text-sm">측정 위치</TableHead>
          <TableHead className="text-center text-xs sm:text-sm">측정 일자</TableHead>
          <TableHead className="text-center text-xs sm:text-sm">측정 기기</TableHead>
          <TableHead className="text-center text-xs sm:text-sm">측정 요약</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell className="text-center">
              <div className="h-5 w-24 mx-auto bg-gray-200 rounded" />
            </TableCell>
            <TableCell className="text-center">
              <div className="h-5 w-28 mx-auto bg-gray-200 rounded" />
            </TableCell>
            <TableCell className="text-center">
              <div className="h-5 w-20 mx-auto bg-gray-200 rounded" />
            </TableCell>
            <TableCell className="flex items-center justify-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1 sm:gap-2 justify-center">
                <Skeleton className="h-4 w-4 sm:h-5 sm:w-5" />
                <Skeleton className="h-5 w-16" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CenterUserMeasureListSkeleton;
