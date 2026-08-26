"use client";

import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import NoticeContainer from "../announcement/Container";
import { useTranslations } from "next-intl";

export default function DefaultHeaderMoreTab({
  tabs,
}: {
  tabs: { key: string; title: string }[];
}) {
  const t = useTranslations("Index");


  const [isOpen, setIsOpen] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false); // 💡 언어 서브메뉴 상태
  const { theme, setTheme } = useTheme();

  const handleTabClick = (key: string) => {
    switch (key) {
      case "darkMode":
        setTheme(theme === "dark" ? "light" : "dark");
        break;
      case "notice":
        setIsNoticeOpen(true);
        setIsOpen(false);
        setIsLangOpen(false);
        break;
      case "language":
        setIsLangOpen(!isLangOpen); // 💡 서브메뉴 토글
        break;
      default:
        break;
    }
  };


  return (
    <div className="relative">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setIsLangOpen(false);
        }}
        className="p-1.5 border border-input bg-white dark:bg-black shadow-sm hover:bg-sub100/90 dark:hover:bg-black/90 rounded-xl transition-colors"
        aria-label="메뉴 토글"
      >
        {isOpen ? <X className="w-5.5 h-5.5 text-gray-600" /> : <Menu className="w-5.5 h-5.5 text-gray-600" />}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              setIsOpen(false);
              setIsLangOpen(false);
            }}
          />

          {/* 메인 메뉴 */}
          <div className="absolute right-0 top-12 w-48 bg-white dark:bg-sub800 border border-gray-100 rounded-2xl shadow-xl p-2 z-50 flex flex-col gap-1">
            {tabs.map((subTab) => (
              <button
                key={subTab.key}
                onClick={() => handleTabClick(subTab.key)}
                className="w-full text-left px-4 py-2 text-sm hover:bg-sub100/50 rounded-xl transition-colors flex items-center justify-between"
              >
                {subTab.key === "darkMode" ? (
                  <span className="text-sm text-sub700 dark:text-sub100 capitalize">
                    {theme === "dark" ? t("theme_light") : t("theme_dark")}
                  </span>
                ) : (
                  <span className="text-sm text-sub700 dark:text-sub100 capitalize">
                    {t(subTab.title)}
                  </span>
                )}
              </button>
            ))}

            {/* 언어 변경 탭 */}
            
          </div>

          {/* 💡 윈도우 스타일 좌측 하단 계단식(Cascading) 서브메뉴 */}
          
        </>
      )}

      {isNoticeOpen && <NoticeContainer onClose={() => setIsNoticeOpen(false)} />}
    </div>
  );
}