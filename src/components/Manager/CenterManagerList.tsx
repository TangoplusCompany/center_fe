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
import { ADMIN_ROLE } from "@/utils/constants/adminRole";
import ManagerRemoveDialog from "./ManagerRemoveDialog";
import { useAuthStore } from "@/providers/AuthProvider";

const CenterManagerList = ({
  managerList,
}: {
  managerList: ICenterManagerData[];
}) => {
  const { adminRole, adminSn } = useAuthStore((state) => state);
  return (
    <div className="w-full table table-fixed min-w-0">
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center w-[100px] whitespace-nowrap">이름</TableHead>
              <TableHead className="text-center whitespace-nowrap">전화번호</TableHead>
              <TableHead className="text-center whitespace-nowrap">이메일</TableHead>
              <TableHead className="text-center whitespace-nowrap">등급</TableHead>
              <TableHead className="text-right whitespace-nowrap"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {managerList.map((manager) => (
              <TableRow key={manager.sn}>
                <TableCell className="text-center font-medium whitespace-nowrap">
                  {manager.admin_name}
                </TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  {phoneHyphen(manager.mobile)}
                </TableCell>

                <TableCell className="text-center whitespace-nowrap">{manager.admin_email}</TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  {ADMIN_ROLE[manager.admin_role as keyof typeof ADMIN_ROLE]}
                </TableCell>
                <TableCell className="flex items-center justify-end gap-2 whitespace-nowrap">
                  <Link
                    href={`/manager/${manager.sn}`}
                    className="flex items-center gap-2 justify-end cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>상세보기</span>
                  </Link>
                  {/* ADMIN_ROLE이 1 이하인 경우 자기 자신은 제거할 수 없음 */}
                  {adminRole < 2 && adminSn !== manager.sn && (
                    <ManagerRemoveDialog manager={manager} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CenterManagerList;
