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
import { phoneHyphen } from "@/utils/regexFiltering";
import { useEffect, useState } from "react";
import { IUserData } from "@/types/user";

export const MainUserList = ({
  users,
  path,
}: {
  users: IUserData[];
  path: string;
}) => {
  const [list, setList] = useState<IUserData[]>(users);

  useEffect(() => {
    setList(users);
  }, [users]);
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
        {list.map((user) => (
          <TableRow key={user.user_uuid}>
            <TableCell className="text-center font-medium">
              {user.user_name}
            </TableCell>
            <TableCell className="text-center ">
              {phoneHyphen(user.mobile)}
            </TableCell>

            <TableCell className="text-center">{user.email}</TableCell>
            <TableCell className="flex items-center justify-end gap-2">
              <Link
                href={`${
                  path === "user"
                    ? `/user/${user.user_uuid}`
                    : `/measure/${user.user_sn}?user_uuid=${user.user_uuid}`
                }`}
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
