"use client";

import React, { useState } from "react";
import Image from "next/image"; // Next.js Image 컴포넌트 임포트
import { Menu, X } from "lucide-react";
import { resultPageUserStore } from "@/stores/ResultPageUserStore";
import { useRouter } from "next/navigation";
import { viewType } from "../Detail";
import { useTranslations } from "next-intl";

interface ResultPageTabProps {
  userName: string;
  currentTab: string;
  onTabClick: (tabKey: viewType) => void; // 추가
}

const USER_SUB_TABS = [
  { key: "latest", title: "user_side_tab_recent_measure" },
  { key: "dashboard", title: "user_side_tab_dashboard" },
  { key: "history", title: "user_side_tab_history" },
  { key: "userInfo", title: "user_side_tab_info" },
];

const ResultPageTab = ({
  userName,
  currentTab,
  onTabClick,
}: ResultPageTabProps) => {
  const t = useTranslations("Index");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleLogout = () => {
    if (confirm(t('alert_logout'))) {
      resultPageUserStore.getState().setLogout();
      router.push("/result-page/login");
    }
  };

  return (
    <div className="relative w-full p-2 flex items-center justify-between">
      
      <div className="flex items-center gap-3 flex-1">
        <div className="w-1 h-12 bg-mainBlue-600 rounded-full"></div>
        <h2 className="text-3xl font-semibold text-[#333] dark:text-white flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          {userName ? `${userName}${t('h_user_title')}` : t('h_user')} {t('h_user_measure_result')}
        </h2>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-50 rounded-xl transition-colors"
        aria-label="메뉴 토글"
      >
        {isOpen ? <X className="w-6 h-6 text-gray-600" /> : <Menu className="w-6 h-6 text-gray-600" />}
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-4 top-16 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl p-2 z-50 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* 1. 서브 탭 메뉴 목록 */}
            {USER_SUB_TABS.map((subTab) => {
              const isSubActive = currentTab === subTab.key;

              return (
                <button
                  key={subTab.key}
                  type="button"
                  onClick={() => {
                    onTabClick(subTab.key as viewType);
                    setIsOpen(false);
                  }}
                  className={`w-full text-center py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isSubActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {t(subTab.title)}
                </button>
              );
            })}

            <div className="border-t border-gray-100 my-1" />
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm text-sub700 hover:text-sub900 hover:bg-sub100 rounded-xl transition-colors font-medium"
              type="button"
              aria-label="로그아웃"
            >
              <Image
                src="/icons/ic_logout.svg"
                alt="로그아웃"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span>{t('logout')}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ResultPageTab;