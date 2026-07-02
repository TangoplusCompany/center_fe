import { INoticeDetail } from "@/types/notice";
import { Skeleton } from "../ui/skeleton";
import { NoticeTypeCss, NoticeTypeRecord } from "./List";

export interface NoticeDetailProps {
  notice : INoticeDetail;
  noticeDetailLoading : boolean;
  noticeDetailError : boolean;
  setNoticeSn: (sn : number | undefined) => void;
}

export default function NoticeDetail(
  {
    notice,
    noticeDetailLoading,
    noticeDetailError,
    setNoticeSn
  } : NoticeDetailProps
) {
  // const router = useRouter();
  console.log(notice)

  if (noticeDetailLoading) return <Skeleton className="w-full h-128"/>;
  if (noticeDetailError) return <p>...</p>;
  return (
    <div className="flex flex-col gap-4">
      
      <button
          onClick={() => setNoticeSn(undefined)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors w-fit"
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
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>뒤로가기</span>
        </button>

        <div className="flex flex-col gap-2 w-full min-h-[900px]">
          {notice && (
            /* h-full 대신 grow(또는 flex-1)와 flex-col을 주어 내부 공간을 꽉 채웁니다 */
            <div className="flex flex-col grow justify-between">
              
              {/* 1. 상단 콘텐츠 영역에 grow를 주어 남은 공간을 다 차지하게 만듭니다 */}
              <div className="grow">
                <div className="flex flex-col text-sub800 gap-1">
                  <div className="md:text-3xl text-xl flex  gap-2">
                    {notice.title}
                    <div className={`text-base px-2 py-1 rounded-lg ${NoticeTypeCss[notice.type]}`}>{NoticeTypeRecord[notice.type]}</div>
                  </div>
                  <span className="md:text-base text-xs">{notice.reg_date.slice(0, 11).replaceAll("-", ".")}</span>
                </div>
                <span className="flex md:text-lg text-xs mt-4">{notice.description}</span>
              </div>

              {/* 2. 상단 영역이 늘어남에 따라 이 영역은 자연스럽게 최하단에 고정됩니다 */}
              <div className="flex flex-col mt-auto bg-sub100 rounded-lg p-2 ">
                첨부파일:
              </div>

            </div>
          )}
        </div>
    </div>
  )
}