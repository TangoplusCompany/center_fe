"use client";

import React, { useEffect } from "react";
import CustomPagination from "@/components/common/Pagination";
import DataError from "@/components/Util/DataError";
import { useMeasureList } from "@/hooks/api/measure/useMeasureList";
import { IMeasureData } from "@/types/measure";
import {
  
  MeasureList,
} from "@/components/Measure/MeasureList";
import { useQueryParams } from "@/hooks/utils/useQueryParams";
import { Skeleton } from "../ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

const MeasureListContainer = ({
  handleTotalItems,
  searchValue,
}: {
  handleTotalItems: (totalItems: number) => void;
  searchValue: string;
}) => {
  const { query } = useQueryParams();
  const deviceSn = query.device_sn || "0";
  const page = parseInt(query.page || "1");
  const limit = parseInt(query.limit || "20");

  const {
    data: measureResponse,
    isLoading,
    isError,
  } = useMeasureList<IMeasureData>({
    page,
    limit,
    deviceSn,
    search: searchValue,
  });
  useEffect(() => {
    if (measureResponse) {
      handleTotalItems(measureResponse.total);
    }
  }, [measureResponse, handleTotalItems]);

  if (isLoading) {
    return (
      <>
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center w-[200px] whitespace-nowrap">이름</TableHead>
            <TableHead className="text-center whitespace-nowrap">전화번호</TableHead>
            <TableHead className="text-center whitespace-nowrap">측정일</TableHead>
            <TableHead className="text-center whitespace-nowrap">측정기기</TableHead>
            {/* <TableHead className="text-center whitespace-nowrap">측정점수</TableHead> */}
            <TableHead className="text-right whitespace-nowrap"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, index) => (
            <TableRow key={index}>
              {Array.from({ length: 4 }).map((_, i) => (
                <TableCell key={i} className="p-2">
                  <Skeleton className="w-full h-[28px]" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </>
    );
  }
  if (isError) {
    return <DataError />;
  }
  if (!measureResponse || Object.keys(measureResponse).length === 0) {
    return (
      <>
        <MeasureList measurements={[]} />
        <CustomPagination total={1} page={1} last_page={1} limit={20} />
      </>
    );
  }
  return (
    <>
      <MeasureList measurements={measureResponse.measurements} />
      <CustomPagination
        total={measureResponse.total}
        page={measureResponse.page}
        last_page={measureResponse.last_page}
        limit={measureResponse.limit}
      />
    </>
  );
};

export default MeasureListContainer;
