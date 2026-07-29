'use client';

import { useEffect, useMemo, useState } from "react";
import CustomPagination from "../common/Pagination";
import SearchForm from "../Util/SearchForm";
import NoticeList, { NoticeTypeRecord } from "./List";
import { INoticeDetail, INoticeList } from "@/types/notice";
import NoticeDetail from "./Detail";


// 💡 상세 데이터까지 포함된 마스터 더미 데이터 (7개)
export const DUMMY_NOTICE_DETAILS: INoticeDetail[] = [
  {
    sn: 1,
    title: "TangoBody 매뉴얼, 상품설명서, 설치·사용 주의사항 안내",
    type: 0,
    author: "TangoBody 관리자페이지 운영진",
    reg_date: "2026-06-12 14:23:00",
    description: "TangoBody",
    attached_file_url: "https://example.com/files/notice_0715.pdf",
    is_read : 0
  },

];

// 💡 INoticeList 인터페이스에 맞춘 최종 더미 데이터
export const DUMMY_NOTICE_LIST: INoticeList = {
  total: 7,
  limit: 10,
  page: 1,
  last_page: 1,
  // 상세 데이터에서 List 아이템 스펙(부모 인터페이스)에 맞는 필드만 추출하여 매핑
  notice_list: DUMMY_NOTICE_DETAILS.map(({ sn, title, type, author, reg_date, is_read }) => ({
    sn,
    title,
    type,
    author,
    reg_date,
    is_read
  })),
};


interface NoticeContainerProps {
  onClose ?: () => void;
  setNoticeSn ?: (sn : number) => void; // 메인 대시보드 화면에서 공지사항을 눌렀을 경우에 받아오는 화면 
}

export type NoticeType = "전체" | "일반 공지" | "신규 기능" | "프로모션" | "오류";



export default function NoticeContainer({onClose}: NoticeContainerProps) {
  const [ noticeSn, setNoticeSn ] = useState<number>();
  const [currentType, setCurrentType] = useState<NoticeType>("전체");
  const NOTICE_TYPES: NoticeType[] = ["전체", "일반 공지", "신규 기능", "프로모션", "오류"];

  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const limit = 8;

  const onChangeSearch = (value: string) => {
    setSearchValue(value);
    setPage(1); // 검색어가 바뀌면 1페이지로 리셋
  };
  const { filteredList, total, lastPage } = useMemo(() => {
    const filtered = DUMMY_NOTICE_LIST.notice_list.filter((notice) => {
      const matchesType = currentType === "전체" || NoticeTypeRecord[notice.type] === currentType;
      const matchesSearch = notice.title.toLowerCase().includes(searchValue.toLowerCase());

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
  }, [page, currentType, searchValue]); // 💡 searchValue와 page state가 바뀔 때만 작동
  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
    // const {
    //   data: noticeDetail,
    //   isLoading : noticeDetailLoading,
    //   isError : noticeDetailError,
    // } = useGetNoticeDetail({ notice_sn: noticeSn });
    const noticeDetail = noticeSn 
      ? DUMMY_NOTICE_DETAILS.find((it) => it.sn === noticeSn)
      : undefined;
  // const {
  //     data: noticeList,
  //     isLoading,
  //     isError,
  //   } = useGetNoticeList({ page, limit, search: searchValue });

  // if (isLoading) return <ManagerDummyList limit={limit} />;
  // if (isError) return <DataError />;
  // if (!noticeList || Object.keys(noticeList).length === 0)
  //   return (
  //     <>
  //       <NoticeList notices={[]} />
  //       <div className="h-[100px] flex items-center justify-center w-full">
  //         <p>조회된 관리자가 없습니다.</p>
  //       </div>
  //       <CustomPagination total={1} last_page={1} limit={20} page={1} />
  //       <SearchForm setSearch={onChangeSearch} search={search} />
  //     </>
  //   );
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-sub700/30 backdrop-blur-sm p-4">
      <div 
        className="relative w-full max-w-[1600px] max-h-[1200px] overflow-y-auto bg-white rounded-xl shadow-2xl p-2 md:p-4 space-y-6 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between w-full">
          <div className="text-xl font-bold p-2">공지사항</div>

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

        {
          noticeDetail ? (
            <NoticeDetail notice={noticeDetail} setNoticeSn={setNoticeSn} noticeDetailLoading={false} noticeDetailError={false} />
           ) : (
            <>
              <div className="flex flex-col md:flex-row justify-between md:gap-0 gap-2">
                <div className="flex gap-2">
                  {NOTICE_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setCurrentType(type)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentType === type
                          ? "bg-mainBlue-600 text-white" // 선택되었을 때
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200" // 선택 안 되었을 때
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col w-full md:w-1/2 ">
                  <SearchForm className="" setSearch={onChangeSearch} search={searchValue} placeholder="검색어를 입력해주세요" />
                </div>
              </div>

              <div className="flex w-full min-h-[900px]">
                <NoticeList notices={filteredList} setNoticeSn={setNoticeSn} />
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
          )
        }
        
      </div>
    </div>
  );
}