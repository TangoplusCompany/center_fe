import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText } from "lucide-react";

const ManagerDummyList = ({ limit }: { limit: number }) => {
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
        {Array.from({ length: limit }).map((_, index) => (
          <TableRow key={index}>
            <TableCell className="text-center font-medium">
              <p></p>
            </TableCell>
            <TableCell className="text-center ">
              <p></p>
            </TableCell>
            <TableCell className="text-center">
              <p></p>
            </TableCell>
            <TableCell className="text-center">
              <p></p>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center gap-2 justify-end cursor-pointer">
                <FileText className="w-4 h-4" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ManagerDummyList;
