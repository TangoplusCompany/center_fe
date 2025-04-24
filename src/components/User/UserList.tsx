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
import { FileText, Trash } from "lucide-react";
import { phoneHyphen } from "@/utils/regexFiltering";
import { useEffect, useState } from "react";
import { IUserData } from "@/types/user";
import { useDeleteUser } from "@/hooks/user/useDeleteUser";

export const UserList = ({ users, refetch }: { users: IUserData[]; refetch: () => void }) => {
  const [list, setList] = useState<IUserData[]>(users);

  const mutationDeleteUser = useDeleteUser(refetch);
  const handleRemoveUser = (sn: number) => {
    mutationDeleteUser.mutate({ sn });
  };

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
                href={`/user/${user.user_uuid}`}
                className="flex items-center gap-2 justify-end cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>상세보기</span>
              </Link>
              <button
                onClick={() => handleRemoveUser(user.user_sn)}
                className="flex items-center gap-2 justify-end cursor-pointer text-red-500"
              >
                <Trash className="w-4 h-4" />
                <span>제거</span>
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
