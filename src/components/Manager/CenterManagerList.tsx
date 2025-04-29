"use client";

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
import { ICenterManagerData } from "@/types/manager";
import { ADMIN_ROLE } from "@/utils/constants";
import ManagerRemoveDialog from "./ManagerRemoveDialog";

const CenterManagerList = ({
  managerList,
}: {
  managerList: ICenterManagerData[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center w-[100px]">이름</TableHead>
          <TableHead className="text-center">전화번호</TableHead>
          <TableHead className="text-center">이메일</TableHead>
          <TableHead className="text-center">등급</TableHead>
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
            <TableCell className="text-center">
              {ADMIN_ROLE[manager.admin_role as keyof typeof ADMIN_ROLE]}
            </TableCell>
            <TableCell className="flex items-center justify-end gap-2">
              <Link
                href={`/manager/${manager.sn}`}
                className="flex items-center gap-2 justify-end cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>상세보기</span>
              </Link>
              <ManagerRemoveDialog manager={manager} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CenterManagerList;
