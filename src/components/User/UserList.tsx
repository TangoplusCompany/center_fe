"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Trash } from "lucide-react";
import { phoneFiltering, phoneHyphen } from "@/utils/regexFiltering";
import { useEffect, useState } from "react";
import { IUserData } from "@/types/user";
import { useDeleteUser } from "@/hooks/api/user/useDeleteUser";
import { useRouter } from "next/navigation";
import { actionUserEncrypt } from "@/app/actions/getCrypto";

export const UserList = ({
  users,
  refetch,
  adminRole,
}: {
  users: IUserData[];
  refetch: () => void;
  adminRole: number;
}) => {
  const [list, setList] = useState<IUserData[]>(users);
  const router = useRouter();

  const mutationDeleteUser = useDeleteUser(refetch);
  const handleRemoveUser = (sn: number) => {
    mutationDeleteUser.mutate({ sn });
  };

  const handleNavigate = async (user_uuid: string, user_sn: number, user_name: string) => {
    const encrypted = await actionUserEncrypt({ user_uuid, user_sn, user_name });
    if (encrypted !== "ERROR") {
      router.push(`/user/${encrypted}`);
    }
  };

  useEffect(() => {
    setList(users);
  }, [users]);
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center w-[100px] whitespace-nowrap">이름</TableHead>
            <TableHead className="text-center whitespace-nowrap">전화번호</TableHead>
            <TableHead className="text-center whitespace-nowrap">이메일</TableHead>
            <TableHead className="text-right whitespace-nowrap"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((user) => (
            <TableRow key={user.user_uuid}>
              <TableCell className="text-center font-medium whitespace-nowrap">
                {user.user_name}
              </TableCell>
              <TableCell className="text-center whitespace-nowrap">
                {phoneFiltering(phoneHyphen(user.mobile))}
              </TableCell>

              <TableCell className="text-center whitespace-nowrap">{user.email}</TableCell>
              <TableCell className="flex items-center justify-end gap-2 whitespace-nowrap">
                <button
                  onClick={() => handleNavigate(user.user_uuid, user.user_sn, user.user_name)}
                  className="flex items-center gap-2 justify-end cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>상세보기</span>
                </button>
                {adminRole < 3 && (
                  <button
                    onClick={() => {
                      if (window.confirm(`${user.user_name} 사용자를 제거하시습니까?`)) {
                        handleRemoveUser(user.user_sn);
                      }
                    }}
                    className="flex items-center gap-2 justify-end cursor-pointer text-red-500"
                  >
                    <Trash className="w-4 h-4" />
                    <span>제거</span>
                  </button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
