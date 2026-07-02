"use client"

import { INoticeListItem } from "@/types/notice";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { NoticeType } from "./Container";

export interface INoticeListProps {
  notices: INoticeListItem[];
  setNoticeSn : (sn : number) => void;
}

export const NoticeTypeRecord: Record<0 | 1 | 2 | 3, NoticeType> = {
  0: "일반 공지",
  1: "신규 기능",
  2: "프로모션",
  3: "오류"
};

export const NoticeTypeCss : Record<0 | 1 | 2 | 3, string> = {
  0: "bg-mainBlue-100 text-mainBlue-600",
  1: "bg-mainBlue-100 text-mainBlue-600",
  2: "bg-mainBlue-600 text-white",
  3: "bg-danger text-white",
}
export default function NoticeList({ notices, setNoticeSn }: INoticeListProps) {
  const [list, setList] = useState<INoticeListItem[]>(notices);

  useEffect(() => {
    setList(notices);
  }, [notices]);

  return (
    <div className="w-full table table-fixed min-w-0">
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {/* 💡 헤더에도 패딩(py-3)을 주어 본문과 균형을 맞춥니다 */}
              <TableHead className="w-[10%] text-center whitespace-nowrap py-4">유형</TableHead>
              <TableHead className="w-[50%] text-center whitespace-nowrap py-4">제목</TableHead>
              <TableHead className="w-[20%] text-center whitespace-nowrap py-4">담당자</TableHead>
              <TableHead className="w-[20%] text-center whitespace-nowrap py-4">등록날짜</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((notice) => (
              <TableRow
                key={notice.sn}
                onClick={() => {
                  setNoticeSn(notice.sn)
                }}
                className="cursor-pointer hover:bg-gray-50/50" // 마우스 오버 효과 추가
              >
                <TableCell className={`text-center font-medium whitespace-nowrap py-8 `}>
                  <span className={`text-base px-2 py-1 rounded-md ${NoticeTypeCss[notice.type]}`}>{NoticeTypeRecord[notice.type]}</span>
                </TableCell>
                
                <TableCell className="text-left text-base md:text-xl font-semibold py-8 px-4 max-w-[300px] truncate">
                  {notice.title}
                </TableCell>
                
                <TableCell className="text-center text-sm md:text-lg whitespace-nowrap py-8">
                  {notice.author}
                </TableCell>
                
                <TableCell className="text-center whitespace-nowrap text-xs md:text-lg py-8 text-gray-500 ">
                  {notice.reg_date.slice(0, 11).replaceAll("-", ".")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}