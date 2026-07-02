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
    title: "[공지] 시스템 정기 점검 안내 (07/15)",
    type: 0,
    author: "최고관리자",
    reg_date: "2026-07-10 14:00:00",
    description: "안정적인 서비스 제공을 위한 서버 정기 점검이 진행될 예정입니다. 점검 시간 중에는 서비스 이용이 일시 중단되오니 양해 부탁드립니다.",
    attached_file_url: "https://example.com/files/notice_0715.pdf",
    is_read : 0
  },
  {
    sn: 2,
    title: "[업데이트] 개인정보처리방침 변경 고지",
    type: 1,
    author: "법무팀",
    reg_date: "2026-07-08 09:30:00",
    description: "새로운 서비스 출시 및 제공에 따라 개인정보처리방침이 일부 변경됩니다. 변경 사항을 확인하시어 이용에 차질 없으시길 바랍니다.",
    attached_file_url: "",
    is_read : 0
  },
  {
    sn: 3,
    title: "[이벤트] 여름맞이 운영자 리프레시 쿠폰 지급",
    type: 2,
    author: "마케팅팀",
    reg_date: "2026-07-05 18:22:11",
    description: "열심히 일하시는 운영자분들을 위한 특별 쿠폰팩이 발급되었습니다. 마이페이지에서 확인해 보세요!",
    attached_file_url: "https://example.com/images/event_summer.png",
    is_read : 0
  },
  {
    sn: 4,
    title: "[긴급] 특정 브라우저 로그인 오류 현상 안내",
    type: 3,
    author: "기술지원팀",
    reg_date: "2026-07-03 11:05:00",
    description: "현재 구버전 브라우저에서 간헐적으로 로그인이 풀리는 현상이 제보되어 긴급 수정 중입니다. 불편을 드려 죄소합니다.",
    attached_file_url: "",
    is_read : 0
  },
  {
    sn: 5,
    title: "[안내] 신규 관리자 기능 매뉴얼 배포",
    type: 0,
    author: "서비스기획팀",
    reg_date: "2026-06-28 16:45:00",
    description: "이번 패치로 추가된 대시보드 커스텀 기능의 상세 사용 매뉴얼 가이드입니다. 첨부파일을 확인해 주세요.",
    attached_file_url: "https://example.com/files/admin_manual_v2.pdf",
    is_read : 0
  },
  {
    sn: 6,
    title: "[인사] 하반기 운영 대행사 소통 창구 일원화 안내",
    type: 0,
    author: "운영총괄",
    reg_date: "2026-06-25 10:00:00",
    description: "업무 효율화를 위해 하반기부터 파트너사 문의 채널이 통합됩니다. 지정된 슬랙 채널을 이용해 주시기 바랍니다.",
    attached_file_url: "",
    is_read : 0
  },
  {
    sn: 7,
    title: "[경고] 계정 보안 강화 및 비밀번호 변경 캠페인",
    type: 1,
    author: "보안운영팀",
    reg_date: "2026-06-20 13:15:30",
    description: "안전한 관리자 페이지 운영을 위해 3개월 이상 비밀번호를 변경하지 않은 계정은 로그인 시 변경 안내 팝업이 노출됩니다.",
    attached_file_url: "",
    is_read : 0
  }
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