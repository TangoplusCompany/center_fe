"use client";

import { IMeasureList } from "@/types/measure";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { FileText } from "lucide-react";
import { nameFiltering, phoneFiltering } from "@/utils/regexFiltering";
import { formatDate } from "@/utils/formatDate";
import { useEffect, useState } from "react";

export const MeasureList = ({
  measurements,
}: {
  measurements: IMeasureList[];
}) => {
  const [list, setList] = useState<IMeasureList[]>(measurements);
  useEffect(() => {
    setList(measurements);
  }, [measurements]);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center w-[100px]">이름</TableHead>
          <TableHead className="text-center">전화번호</TableHead>
          <TableHead className="text-center">측정일</TableHead>
          <TableHead className="text-center">측정기기</TableHead>
          <TableHead className="text-center">측정점수</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((measurement, index) => (
          <TableRow key={measurement.user_uuid + `-${index}`}>
            <TableCell className="text-center font-medium">
              {measurement.user_name
                ? nameFiltering(measurement.user_name)
                : ""}
            </TableCell>
            <TableCell className="text-center ">
              {phoneFiltering(measurement.mobile)}
            </TableCell>
            <TableCell className="text-center">
              {formatDate(measurement.measure_date)}
            </TableCell>
            <TableCell className="text-center">
              {measurement.device_name}
            </TableCell>
            <TableCell className="text-center">
              {measurement.t_score}점
            </TableCell>
            <TableCell className="text-right">
              <Link
                href={`/measure/${measurement.sn}?user_uuid=${measurement.user_uuid}`}
                className="flex items-center gap-2 justify-end cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>상세보기</span>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
