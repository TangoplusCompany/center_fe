import { INoticeListItem } from "@/types/notice"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { NoticeTypeCss, NoticeTypeRecord } from "../notice/List"

export interface DashboardNoticeContainerProps {
  noticeList : INoticeListItem[]
}


export default function DashboardNoticeContainer({ noticeList }: DashboardNoticeContainerProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="w-1 h-10 bg-mainBlue-600 rounded-full"></div>
        <h2 className="text-2xl col-span-2">공지사항</h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {/* 💡 헤더에도 패딩(py-3)을 주어 본문과 균형을 맞춥니다 */}
            <TableHead className="w-[10%] text-center whitespace-nowrap ">유형</TableHead>
            <TableHead className="w-[50%] text-center whitespace-nowrap ">제목</TableHead>
            <TableHead className="w-[20%] text-center whitespace-nowrap ">담당자</TableHead>
            <TableHead className="w-[20%] text-center whitespace-nowrap ">등록날짜</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(noticeList || []).map((notice) => (
            <TableRow
              key={notice.sn}
              onClick={() => {
                
              }}
              className="cursor-pointer hover:bg-gray-50/50" // 마우스 오버 효과 추가
            >
              {/* 💡 를 추가해 행 간격을 넓히고 위아래 여백을 줍니다 */}
              <TableCell className={`text-center font-medium whitespace-nowrap `}>
                <span className={`text-base px-2 py-1 rounded-md ${NoticeTypeCss[notice.type]}`}>{NoticeTypeRecord[notice.type]}</span>
              </TableCell>
              
              {/* 💡 제목은 텍스트가 길어질 수 있으므로 truncate와 max-w를 조합해 깔끔하게 관리합니다 */}
              <TableCell className="text-left text-xl font-semibold px-4 max-w-[300px] truncate">
                {notice.title}
              </TableCell>
              
              <TableCell className="text-center text-lg whitespace-nowrap ">
                {notice.author}
              </TableCell>
              
              <TableCell className="text-center whitespace-nowrap text-lg  text-gray-500 ">
                {notice.reg_date.slice(0, 11).replaceAll("-", ".")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}