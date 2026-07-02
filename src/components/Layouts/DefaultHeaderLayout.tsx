import React, { useEffect, useState } from "react";
// import { DarkModeToggle } from "../ui/darkmode";
import UpdateSessionButton from "../Util/UpdateSessionButton";
import LoginUserCircle from "../Util/LoginUserCircle";
import { useAuthStore } from "@/providers/AuthProvider";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useLogout } from "@/hooks/api/auth/useLogout";
import { Button } from "@/components/ui/button";
import DefaultHeaderMoreTab from "./DefaultHeaderMoreTab";
import { useNoticeStore } from "@/stores/noticeStore";
import Balloon from "../common/Balloon";
import { usePathname } from "next/navigation";

const USER_SUB_TABS = [
  // { key: "notice", title: "공지사항" },
  { key: "darkMode", title: "다크모드" },
];

export default function DefaultHeaderLayout() {
  const adminName = useAuthStore((state) => state.adminName);
  const adminRole = useAuthStore((state) => state.adminRole);
  const pathname = usePathname();
  const isCenterPage = pathname === "/center";
  const logoutMutation = useLogout();
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  useEffect(() => {
    const hasSeen = localStorage.getItem("has_seen_sidebar_hint");
    if (!hasSeen) {
      setShowSidebarHint(true);
    }
  }, []);
  const handleCloseHint = () => {
    setShowSidebarHint(false);
    localStorage.setItem("has_seen_sidebar_hint", "true"); // 💡 다시 보지 않도록 저장
  };
  
  const filteredTabs = isCenterPage 
    ? USER_SUB_TABS.filter(tab => tab.key !== "notice")
    : USER_SUB_TABS;

  // 말풍선 재생성 방지 
  const { hasUnreadNotice, setHasUnreadNotice } = useNoticeStore();
  const [showSidebarHint, setShowSidebarHint] = useState(true); // 실제론 useEffect + localStorage 조합
  const { state, openMobile } = useSidebar();
  const isSidebarCollapsed = state === "collapsed" && !openMobile;
  return (
    <header className="sticky top-0 left-0 right-0 z-10 bg-white dark:bg-black flex w-full h-auto min-h-16 md:h-20 px-4 md:px-12 py-2 md:py-5 justify-between items-center">
      <div className="flex items-center min-w-0">
        <SidebarTrigger
          className="xl:hidden shrink-0 h-9 w-9"
          aria-label="사이드바 열기"
        />
        {isSidebarCollapsed && showSidebarHint && (
          <Balloon
            direction="left"
            className="left-[86px] top-1/2 -translate-y-1/2 w-[220px]"
            message="숨겨진 메뉴 탭을 확인해보세요!"
            buttonText="다시 보지 않기"
            onClickButton={handleCloseHint} 
            onClose={handleCloseHint}      
          />
        )}
        
      </div>
      <div className="flex items-center gap-1 md:gap-5 shrink-0">
        <div className="hidden md:block">
          <LoginUserCircle adminName={adminName} adminRole={adminRole} />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <UpdateSessionButton />
          <Button
            type="button"
            variant="outline"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="text-sm md:text-base"
          >
            로그아웃
          </Button>
        </div>
        <DefaultHeaderMoreTab tabs={filteredTabs} />
        {!isCenterPage && hasUnreadNotice && (
            <Balloon
              direction="top"
              className="top-[70px] right-[12px] md:right-[45px] w-[270px]"
              message="📢 중요한 최근 공지사항이 등록되었습니다. 지금 확인해 보세요"
              onClose={() => setHasUnreadNotice(false)}
            />
          )}
      </div>
      <div className="absolute bottom-0 left-4 right-4 md:left-12 md:right-12 h-px bg-gray-300 dark:bg-gray-800"></div>
    </header>
  );
}
