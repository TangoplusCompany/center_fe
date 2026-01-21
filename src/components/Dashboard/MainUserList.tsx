"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText } from "lucide-react";
import { emailFiltering, nameFiltering, phoneFiltering } from "@/utils/regexFiltering";
import { useEffect, useState } from "react";
import { IUserData } from "@/types/user";
import { IMeasureList } from "@/types/measure";
import { formatDate } from "@/utils/formatDate";
import { useRouter } from "next/navigation";
import { actionUserEncrypt, actionMeasureEncrypt } from "@/app/actions/getCrypto";

export const MainUserList = ({
  users,
  path,
}: {
  users: IUserData[] | IMeasureList[];
  path: string;
}) => {
  const router = useRouter();
  const [list, setList] = useState<IUserData[] | IMeasureList[]>(users);

  useEffect(() => {
    setList(users);
  }, [users]);

  const handleUserNavigate = async (user_uuid: string, user_sn: number, user_name: string) => {
    const encrypted = await actionUserEncrypt({ user_uuid, user_sn, user_name });
    if (encrypted !== "ERROR") {
      router.push(`/user/${encrypted}`);
    }
  };

  const handleMeasureNavigate = async (measure_sn: number, user_sn: number) => {
    const encrypted = await actionMeasureEncrypt({ measure_sn, user_sn });
    if (encrypted !== "ERROR") {
      router.push(`/measure/${encrypted}`);
    }
  };
  return (
    <div className="w-full overflow-x-auto">
      <Table>
      {path === "user" && (
        <>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center w-[100px] whitespace-nowrap">이름</TableHead>
              <TableHead className="text-center whitespace-nowrap">전화번호</TableHead>
              <TableHead className="text-center whitespace-nowrap">이메일</TableHead>
              <TableHead className="text-right whitespace-nowrap"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(list as IUserData[]).map((user) => (
              <TableRow key={user.user_uuid}>
                <TableCell className="text-center font-medium whitespace-nowrap">
                  {nameFiltering(user.user_name)}
                </TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  {phoneFiltering(user.mobile)}
                </TableCell>

                <TableCell className="text-center whitespace-nowrap">{emailFiltering(user.email)}</TableCell>
                <TableCell className="flex items-center justify-end gap-2 whitespace-nowrap">
                  <button
                    onClick={() => handleUserNavigate(user.user_uuid, user.user_sn, user.user_name)}
                    className="flex items-center gap-2 justify-end cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>상세보기</span>
                  </button>
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
              <TableHead className="text-center w-[100px] whitespace-nowrap">이름</TableHead>
              <TableHead className="text-center whitespace-nowrap">디바이스 이름</TableHead>
              <TableHead className="text-center whitespace-nowrap">측정일</TableHead>
              <TableHead className="text-right whitespace-nowrap"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(list as IMeasureList[]).map((measure) => (
              <TableRow key={measure.measure_sn ?? measure.sn}>
                <TableCell className="text-center font-medium whitespace-nowrap">
                  {nameFiltering(measure.user_name)}
                </TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  {measure.device_name}
                </TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  {formatDate(measure.measure_date)}
                </TableCell>
                <TableCell className="flex items-center justify-end gap-2 whitespace-nowrap">
                  <button
                    onClick={() => handleMeasureNavigate(measure.measure_sn ?? measure.measure_sn, measure.user_sn)}
                    className="flex items-center gap-2 justify-end cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>상세보기</span>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </>
      )}
      </Table>
    </div>
  );
};
