"use client";

import React, { useState } from "react";
import Image from "next/image"; // Next.js Image 컴포넌트 임포트
import { Menu, X } from "lucide-react";
import { resultPageUserStore } from "@/stores/ResultPageUserStore";
import { useRouter } from "next/navigation";
import { viewType } from "../Detail";

interface ResultPageTabProps {
  userName: string;
  currentTab: string;
  setCurrentTab: (tab: viewType) => void;
}

const USER_SUB_TABS = [
  { key: "latest", title: "최근 측정" },
  { key: "dashboard", title: "대시보드" },
  { key: "history", title: "측정 이력" },
  { key: "userInfo", title: "사용자 정보" },
];

const ResultPageTab = ({
  userName,
  currentTab,
  setCurrentTab,
}: ResultPageTabProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

    // ----------# 로그아웃 핸들러 (isMyPage일 때만 사용) #-----------
  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      // 전역 store 인스턴스를 직접 사용 (Provider 없이도 사용 가능)
      resultPageUserStore.getState().setLogout();
      router.push("/result-page/login");
    }
  };

  return (
    <div className="relative w-full p-2 flex items-center justify-between">
      
      {/* 좌측: 유저 프로필 및 이름 */}
      <div className="flex items-center gap-3 flex-1">
        <div className="w-1 h-12 bg-toggleAccent rounded-full"></div>
        <h2 className="text-3xl font-semibold text-[#333] dark:text-white flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          {userName ? `${userName}님` : "사용자"} 측정 결과
        </h2>
      </div>

      {/* 우측: 햄버거 토글 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-50 rounded-xl transition-colors"
        aria-label="메뉴 토글"
      >
        {isOpen ? <X className="w-6 h-6 text-gray-600" /> : <Menu className="w-6 h-6 text-gray-600" />}
      </button>

      {/* 셀렉트 박스 형태의 드롭다운 메뉴 */}
      {isOpen && (
        <>
          {/* 바깥 영역 클릭 시 닫히도록 투명 딤드 처리 */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          
          {/* 절대 좌표 드롭다운 박스 */}
          <div className="absolute right-4 top-16 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl p-2 z-50 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* 1. 서브 탭 메뉴 목록 */}
            {USER_SUB_TABS.map((subTab) => {
              const isSubActive = currentTab === subTab.key;

              return (
                <button
                  key={subTab.key}
                  type="button"
                  onClick={() => {
                    setCurrentTab(subTab.title as viewType);
                    setIsOpen(false);
                  }}
                  className={`w-full text-center py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isSubActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {subTab.title}
                </button>
              );
            })}

            {/* 2. 👈 구분선(Divider) 및 로그아웃 버튼 추가 */}
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
              {/* 드롭다운 내부이므로 무조건 글자가 보이도록 inline으로 통일 */}
              <span>로그아웃</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ResultPageTab;