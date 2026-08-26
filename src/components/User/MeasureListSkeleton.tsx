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
import { useTranslations } from "next-intl";

const CenterUserMeasureListSkeleton = () => {
  const t = useTranslations("Index");
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center text-xs sm:text-sm">{t('m_history_col_location')}</TableHead>
          <TableHead className="text-center text-xs sm:text-sm">{t('m_history_col_date')}</TableHead>
          <TableHead className="text-center text-xs sm:text-sm">{t('m_history_col_device')}</TableHead>
          <TableHead className="text-center text-xs sm:text-sm">{t('m_history_col_explain')}</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: 12 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell className="text-center">
              <div className="h-5 w-24 mx-auto bg-sub150 dark:bg-sub750 rounded" />
            </TableCell>
            <TableCell className="text-center">
              <div className="h-5 w-28 mx-auto bg-sub150 dark:bg-sub750 rounded" />
            </TableCell>
            <TableCell className="text-center">
              <div className="h-5 w-20 mx-auto bg-sub150 dark:bg-sub750 rounded" />
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
