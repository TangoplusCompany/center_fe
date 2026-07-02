"use client";

import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import NoticeContainer from "../notice/Container";



export default function DefaultHeaderMoreTab({
  tabs
}: {
  tabs : { key: string; title: string; }[]
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const handleTabClick = (key: string) => {
    switch (key) {
      case "darkMode":
        setTheme(theme === "dark" ? "light" : "dark");
        break;
        
      case "notice":
        setIsNoticeOpen(true); // 💡 공지사항 모달 열기
        setIsOpen(false); // 필요 시 메뉴 닫기
        break;
        
      default:
        break;
    }
  };

  return (
    <div className="relative"> {/* absolute 배치를 위해 부모에 relative 추가 추천 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 border border-input bg-white dark:bg-black shadow-sm hover:bg-sub100/90 dark:hover:bg-black/90  rounded-xl transition-colors"
        aria-label="메뉴 토글"
      >
        {isOpen ? <X className="w-5.5 h-5.5 text-gray-600" /> : <Menu className="w-5.5 h-5.5 text-gray-600 " />}
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-4 top-16 w-48 bg-white dark:bg-sub800 border border-gray-100 rounded-2xl shadow-xl p-2 z-50 flex flex-col gap-1">
            
            {tabs.map((subTab) => (
              <button
                key={subTab.key}
                onClick={() => handleTabClick(subTab.key)}
                className="w-full text-left px-4 py-2 text-sm  hover:bg-sub100/50 rounded-xl transition-colors"
              >
                {subTab.key === "darkMode" ? (
                  <span className="text-sm text-sub700 dark:text-sub100 capitalize">
                    {theme === "dark" ? "테마: 다크모드" : "테마: 라이트모드"}
                  </span>
                ) : (
                  <span className="text-sm text-sub700 dark:text-sub100 capitalize">{subTab.title}</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}

      {isNoticeOpen && (
        <NoticeContainer onClose={() => setIsNoticeOpen(false)} />
      )}
    </div>
  );
}