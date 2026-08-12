"use client";

import { IAnnouncementsItem } from "@/types/announcement";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export interface IAnnouncementListProps {
  Announcements: IAnnouncementsItem[];
  setAnnouncementSn: (sn: number) => void;
}

export const AnnouncementCategoryRecord: Record<string, string> = {
  ALL: "전체",
  NOTICE: "일반 공지",
  HOTFIX: "긴급 수정",
  UPDATE: "신규 기능",
  MAINTENANCE: "점검",
  PROMOTION: "프로모션",
  ETC: "기타",
};

export const AnnouncementCategoryCss: Record<string, string> = {
  ALL: "bg-gray-100 text-gray-600",
  NOTICE: "bg-blue-100 text-blue-600",
  HOTFIX: "bg-red-100 text-red-600",
  UPDATE: "bg-emerald-100 text-emerald-600",
  MAINTENANCE: "bg-orange-100 text-orange-600",
  PROMOTION: "bg-purple-100 text-purple-600",
  ETC: "bg-gray-100 text-gray-600",
};

export default function AnnouncementList({ Announcements, setAnnouncementSn }: IAnnouncementListProps) {
  return (
    <div className="w-full table table-fixed min-w-0">
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[15%] text-center whitespace-nowrap py-4">유형</TableHead>
              <TableHead className="w-[55%] text-start whitespace-nowrap py-4">제목 및 내용</TableHead>
              <TableHead className="w-[15%] text-center whitespace-nowrap py-4">등록날짜</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            
            {Announcements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-sub500 text-sm">
                  등록된 공지사항이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              Announcements.map((announcement) => (
                <TableRow
                  key={announcement.sn}
                  onClick={() => setAnnouncementSn(announcement.sn)}
                  className="cursor-pointer hover:bg-gray-50/50"
                >
                  {/* 유형 */}
                  <TableCell className="text-center font-medium whitespace-nowrap py-5 align-middle">
                    <span className={`text-xs md:text-sm px-2.5 py-1 rounded-md font-semibold ${AnnouncementCategoryCss[announcement.category] || "bg-gray-100 text-gray-600"}`}>
                      {AnnouncementCategoryRecord[announcement.category] || announcement.category}
                    </span>
                  </TableCell>
                  
                  {/* 제목 및 본문 미리보기 */}
                  <TableCell className="text-left py-5 px-4 max-w-[400px]">
                    {/* 읽음 여부에 따라 제목 색상 조절 (읽음: text-gray-400, 안읽음: text-gray-900) */}
                    <div className={`text-base md:text-lg font-bold truncate ${announcement.is_read ? "text-gray-400 font-normal" : "text-gray-900"}`}>
                      {announcement.title}
                    </div>
                    {/* 본문 미리보기 */}
                    <div className="text-xs md:text-sm text-gray-400 truncate mt-1">
                      {announcement.content_preview}
                    </div>
                  </TableCell>

                  
                  
                  {/* 등록날짜 */}
                  <TableCell className="text-center whitespace-nowrap text-xs md:text-sm py-5 text-gray-400 align-middle">
                    {announcement.published_at ? announcement.published_at.slice(0, 10).replaceAll("-", ".") : "-"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}