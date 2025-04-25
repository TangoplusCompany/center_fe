"use client";

import { useGetManagerList } from "@/hooks/auth/useGetManagerList";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { phoneHyphen } from "@/utils/regexFiltering";
import { FileText } from "lucide-react";
import Link from "next/link";

const CenterManagerList = () => {
  const { data: managerList, isLoading, isError } = useGetManagerList();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  if (!managerList) return <div>No data available</div>;

  return (
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
        {managerList.map((manager) => (
          <TableRow key={manager.sn}>
            <TableCell className="text-center font-medium">
              {manager.admin_name}
            </TableCell>
            <TableCell className="text-center ">
              {phoneHyphen(manager.mobile)}
            </TableCell>

            <TableCell className="text-center">{manager.admin_email}</TableCell>
            <TableCell className="flex items-center justify-end gap-2">
              <Link
                href={`/setting/admin/${manager.sn}`}
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

export default CenterManagerList;
