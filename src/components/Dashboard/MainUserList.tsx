"use client";

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
import { emailFiltering, nameFiltering, phoneFiltering } from "@/utils/regexFiltering";
import { useEffect, useState } from "react";
import { IUserData } from "@/types/user";
import { IMeasureList } from "@/types/measure";
import { formatDate } from "@/utils/formatDate";

export const MainUserList = ({
  users,
  path,
}: {
  users: IUserData[] | IMeasureList[];
  path: string;
}) => {
  const [list, setList] = useState<IUserData[] | IMeasureList[]>(users);

  useEffect(() => {
    setList(users);
  }, [users]);
  return (
    <Table>
      {path === "user" && (
        <>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center w-[100px]">이름</TableHead>
              <TableHead className="text-center">전화번호</TableHead>
              <TableHead className="text-center">이메일</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(list as IUserData[]).map((user) => (
              <TableRow key={user.user_uuid}>
                <TableCell className="text-center font-medium">
                  {nameFiltering(user.user_name)}
                </TableCell>
                <TableCell className="text-center ">
                  {phoneFiltering(user.mobile)}
                </TableCell>

                <TableCell className="text-center">{emailFiltering(user.email)}</TableCell>
                <TableCell className="flex items-center justify-end gap-2">
                  <Link
                    href={`/user/${user.user_uuid}?key=${user.user_sn}`}
                    className="flex items-center gap-2 justify-end cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>상세보기</span>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </>
      )}
      {path === "measure" && (
        <>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center w-[100px]">이름</TableHead>
              <TableHead className="text-center">점수</TableHead>
              <TableHead className="text-center">측정일</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(list as IMeasureList[]).map((measure) => (
              <TableRow key={measure.user_uuid}>
                <TableCell className="text-center font-medium">
                  {nameFiltering(measure.user_name)}
                </TableCell>
                <TableCell className="text-center ">
                  {measure.t_score}점
                </TableCell>
                <TableCell className="text-center">
                  {formatDate(measure.measure_date)}
                </TableCell>
                <TableCell className="flex items-center justify-end gap-2">
                  <Link
                    href={`/measure/${measure.measure_sn}?user_uuid=${measure.user_uuid}`}
                    className="flex items-center gap-2 justify-end cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>상세보기</span>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </>
      )}
    </Table>
  );
};
