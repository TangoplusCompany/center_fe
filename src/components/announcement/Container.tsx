'use client';

import { useEffect, useMemo, useState } from "react";
import CustomPagination from "../common/Pagination";
import SearchForm from "../Util/SearchForm";
import AnnouncementList from "./List";
import AnnouncementDetail from "./Detail";
import { Skeleton } from "../ui/skeleton";
import { useGetAnnouncements } from "@/hooks/api/announcement/useGetAnnouncements";
import { useGetAnnouncement } from "@/hooks/api/announcement/useGetAnnouncement"; // 1. 상세 조회 훅 추가
import { useQueryParams } from "@/hooks/utils/useQueryParams";
import { useTranslations } from "next-intl";

interface AnnouncementContainerProps {
  onClose?: () => void;
  setAnnouncementSn?: (sn: number) => void;
}

export type AnnouncementType =
  | "ALL"
  | "NOTICE"
  | "HOTFIX"
  | "UPDATE"
  | "MAINTENANCE"
  | "PROMOTION"
  | "ETC";

// 2. 카테고리 목록 배열
export const ANNOUNCEMENT_TYPES: AnnouncementType[] = [
  "ALL",
  "NOTICE",
  "HOTFIX",
  "UPDATE",
  "MAINTENANCE",
  "PROMOTION",
  "ETC",
];

// 3. 번역 키 매핑 객체
export const AnnouncementTypeRecord: Record<AnnouncementType, string> = {
  ALL: "announcement_category_all",
  NOTICE: "announcement_category_notice",
  HOTFIX: "announcement_category_hotfix",
  UPDATE: "announcement_category_update",
  MAINTENANCE: "announcement_category_maintenance",
  PROMOTION: "announcement_category_promotion",
  ETC: "announcement_category_etc",
} as const;

export default function AnnouncementContainer({ onClose }: AnnouncementContainerProps) {
  const t = useTranslations("Index");
  const [announcementSn, setAnnouncementSn] = useState<number>();
  const [currentType, setCurrentType] = useState<AnnouncementType>("ALL");
  const [searchValue, setSearchValue] = useState("");
  const limit = 8;
  const { query, setQueryParam } = useQueryParams();
  const page = Number(query.page || 1);
  const { data: announcements, isLoading, isError } = useGetAnnouncements({
    page,
    limit,
    search: searchValue,
  });

  const { 
    data: announcementDetail, 
    isLoading: isDetailLoading, 
    isError: isDetailError 
  } = useGetAnnouncement({
    announcement_sn: announcementSn,
  });
  
  const onChangeSearch = (value: string) => {
    setSearchValue(value);
    setQueryParam("page", 1); // 검색 시 1페이지로 이동
  };

  const { filteredList, total, lastPage } = useMemo(() => {
    const rawList = announcements?.announcements || [];

    const filtered = rawList.filter((announcement) => {
      // 💡 category 값을 currentType과 직접 비교 (또는 타입 단언 as AnnouncementType 적용)
      const matchesType =
        currentType === "ALL" || announcement.category === currentType;

      const matchesSearch = announcement.title
        .toLowerCase()
        .includes(searchValue.toLowerCase());

      return matchesType && matchesSearch;
    });

    const totalCount = filtered.length;
    const calcLastPage = Math.ceil(totalCount / limit) || 1;
    const startIndex = (page - 1) * limit;
    const pagedList = filtered.slice(startIndex, startIndex + limit);

    return {
      filteredList: pagedList,
      total: totalCount,
      lastPage: calcLastPage,
    };
  }, [announcements, currentType, searchValue, page, limit]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (isLoading || isError) {
    return (
      <div className="flex flex-col p-4">
        <Skeleton className="w-32 h-32" />
      </div>
    );
  }
  // TODO 여기서부터 translate
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-sub700/30 backdrop-blur-sm p-4">
      <div 
        className="relative w-[90%] h-[90%] md:w-[80%] md:h-[80%] flex flex-col bg-white rounded-xl shadow-2xl p-4 md:p-6 animate-scale-up overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between w-full">
          <div className="text-xl font-bold p-2">{t('announcement')}</div>

          <button 
            type="button"
            onClick={() => {
              onClose?.();
              onChangeSearch("");
            }}
            className="absolute top-4 right-4 text-sub400 hover:text-sub600 p-2 rounded-lg hover:bg-sub100 transition cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 3. 상세조회 분기 및 데이터 전달 */}
        {announcementSn ? (
          <AnnouncementDetail 
            announcement={announcementDetail!}
            isLoading={isDetailLoading}
            isError={isDetailError}
            setAnnouncementSn={setAnnouncementSn} 
          />
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between md:gap-0 gap-2">
              <div className="flex gap-2">
                {ANNOUNCEMENT_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setCurrentType(type);
                      setQueryParam("page", 1); 
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentType === type
                        ? "bg-mainBlue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {t(AnnouncementTypeRecord[type])}
                  </button>
                ))}
              </div>

              <div className="flex flex-col w-full md:w-1/2">
                <SearchForm setSearch={onChangeSearch} search={searchValue} placeholder={t('announcement_search_hint')} />
              </div>
            </div>

            <div className="flex w-full min-h-[600px]">
              <AnnouncementList Announcements={filteredList} setAnnouncementSn={setAnnouncementSn} />
            </div>

            <div className="flex flex-col items-center gap-4 border-t pt-4 w-full">
              <CustomPagination 
                total={total} 
                last_page={lastPage} 
                limit={limit} 
                page={page}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}