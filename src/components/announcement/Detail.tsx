"use client";

import { IAnnouncementDetail } from "@/types/announcement";
import { Skeleton } from "../ui/skeleton";
import { AnnouncementCategoryCss, AnnouncementCategoryRecord } from "./List";
import { useQueryClient } from "@tanstack/react-query";

export interface AnnouncementDetailProps {
  announcement: IAnnouncementDetail;
  isLoading?: boolean;
  isError?: boolean;
  setAnnouncementSn: (sn: number | undefined) => void;
}

// 파일 용량 바이트 단위 변환 함수
const formatFileSize = (bytes: number) => {
  if (!bytes) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

export default function AnnouncementDetail({
  announcement,
  isLoading,
  isError,
  setAnnouncementSn,
}: AnnouncementDetailProps) {
  const queryClient = useQueryClient();

  const handleBack = () => {
    queryClient.invalidateQueries({ queryKey: ["adminList"] }); 
    setAnnouncementSn(undefined);
  };
  const handleDownload = (fileUrl: string, fileName: string) => {
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(fileUrl)}&name=${encodeURIComponent(fileName)}`;
    window.location.href = proxyUrl;
  };
  if (isLoading) return <Skeleton className="w-full h-96" />;
  if (isError || !announcement) return <div className="p-4 text-center text-red-500">공지사항을 불러오지 못했습니다.</div>;
  
  return (
    // 1. 최상위 루트 div에 h-full, min-h-0, overflow-hidden 추가
    <div className="flex flex-col gap-4 p-2 h-full min-h-0 overflow-hidden">
      {/* 뒤로가기 버튼 (고정) */}
      <button
        type="button"
        onClick={handleBack}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors w-fit cursor-pointer shrink-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>이전으로</span>
      </button>

      {/* 2. 남은 높이를 채우도록 flex-1 추가 */}
      <div className="flex flex-col gap-2 w-full flex-1 min-h-0 overflow-hidden">
        <div className="flex flex-col h-full min-h-0 justify-between gap-6">
          
          {/* 상단 제목 + 스크롤 가능한 본문 영역 */}
          <div className="flex flex-col flex-1 min-h-0 space-y-6 overflow-hidden">
            {/* 제목 및 작성일 (고정) */}
            <div className="flex flex-col text-sub800 gap-2 border-b pb-4 shrink-0">
              <div className="flex items-center gap-3">
                <span className={`text-xs md:text-sm px-2.5 py-1 rounded-md font-semibold ${AnnouncementCategoryCss[announcement.category] || "bg-gray-100 text-gray-600"}`}>
                  {AnnouncementCategoryRecord[announcement.category] || announcement.category}
                </span>
                <h1 className="md:text-2xl text-lg font-bold">{announcement.title}</h1>
              </div>
              <span className="md:text-sm text-xs text-gray-500">
                {announcement.published_at ? announcement.published_at.slice(0, 16).replaceAll("-", ".") : "-"}
              </span>
            </div>

            {/* 본문 (독립 내부 스크롤) */}
            <div className="flex-1 overflow-y-auto pr-2 md:text-base text-sm whitespace-pre-wrap leading-relaxed text-gray-800">
              {announcement.content}
            </div>
          </div>

          {/* 하단 첨부파일 영역 (하단 고정) */}
          {announcement.attachments && announcement.attachments.length > 0 && (
            <div className="flex flex-col bg-sub100/50 border rounded-lg p-4 gap-2 shrink-0">
              <span className="text-sm font-semibold text-gray-700">
                첨부파일 ({announcement.attachments.length})
              </span>
              <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto">
                {announcement.attachments.map((file) => (
                  <button
                    key={file.sn}
                    type="button"
                    onClick={() => handleDownload(file.file_url, file.file_name)}
                    className="flex items-center justify-between p-2 bg-white rounded border hover:bg-gray-50 transition text-sm group w-full text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      <span className="truncate text-gray-700 group-hover:text-blue-600 font-medium">
                        {file.file_name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0 ml-2">
                      {formatFileSize(file.file_size)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}