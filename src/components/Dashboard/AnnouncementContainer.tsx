import { IAnnouncementsItem, ANNOUNCEMENT_TYPE_LIST } from "@/types/announcement";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { FileText } from "lucide-react";
import { formatDate } from "@/utils/formatDate";

export interface DashboardannouncementContainerProps {
  announcementsItem: IAnnouncementsItem[];
  onSelectNotice: (sn: number) => void; // 👈 1. 콜백 함수 추가
}

export default function DashboardannouncementContainer({ 
  announcementsItem,
  onSelectNotice 
}: DashboardannouncementContainerProps) {
  const recentAnnouncements = (announcementsItem || []).slice(0, 5);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="w-1 h-10 bg-mainBlue-600 rounded-full"></div>
        <h2 className="text-2xl col-span-2">공지사항</h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10%] text-center whitespace-nowrap">유형</TableHead>
            <TableHead className="w-[25%] text-center whitespace-nowrap">제목</TableHead>
            <TableHead className="w-[35%] text-center whitespace-nowrap">내용</TableHead>
            <TableHead className="w-[20%] text-center whitespace-nowrap">등록날짜</TableHead>
            <TableHead className="w-[10%] text-right whitespace-nowrap"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentAnnouncements.map((announcement) => (
            <TableRow
              key={announcement.sn}
              onClick={() => onSelectNotice(announcement.sn)} // 👈 2. 행 전체 클릭 시
              className="cursor-pointer hover:bg-gray-50/50"
            >
              <TableCell className="text-center font-medium whitespace-nowrap">
                <span className="px-2 py-1 bg-blue-50 text-mainBlue-600 rounded text-xs font-bold">
                  { // 이모지만 제거
                  (ANNOUNCEMENT_TYPE_LIST?.find((meta) => meta.key === announcement.category)?.label || announcement.category)
                    ?.replace(/^[\p{Emoji}\p{Emoji_Component}\s]+/gu, '')}
                </span>
              </TableCell>

              <TableCell className="text-left px-4 truncate">
                {announcement.title}
              </TableCell>

              <TableCell className="text-left whitespace-nowrap max-w-[400px] truncate text-sub600 text-xs">
                {announcement.content_preview}
              </TableCell>

              <TableCell className="text-center whitespace-nowrap text-sub700">
                {announcement.published_at ? formatDate(announcement.published_at): '-'}
              </TableCell>

              <TableCell className="flex items-center justify-end gap-2 whitespace-nowrap">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // 행 클릭과 중복 방지
                    onSelectNotice(announcement.sn); // 👈 3. 상세보기 버튼 클릭 시
                  }}
                  className="flex items-center gap-2 justify-end cursor-pointer hover:text-mainBlue-600"
                >
                  <FileText className="w-4 h-4" />
                  <span>상세보기</span>
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}