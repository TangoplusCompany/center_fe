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
import { useGetAnnouncements } from "@/hooks/api/announcement/useGetAnnouncements";
import { useTranslations } from "next-intl";

const USER_SUB_TABS = [
  { key: "notice", title: "announcement" },
  { key: "darkMode", title: "theme" },
];

export default function DefaultHeaderLayout() {
  const t = useTranslations("Index");
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

  // 1. API 데이터 조회
  const { data: announcementsData } = useGetAnnouncements({ page: 1, limit: 10, search: "" });

  // 2. 전역 스토어
  const { hasUnreadNotice, setHasUnreadNotice } = useNoticeStore();

  // 3. API 데이터로 스토어 상태 동기화
  useEffect(() => {
    if (announcementsData) {
      const isUnread = announcementsData.announcements.some((item) => !item.is_read);
      setHasUnreadNotice(isUnread);
    }
  }, [announcementsData, setHasUnreadNotice]);

  const [showSidebarHint, setShowSidebarHint] = useState(true);
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
            message={`${t('tooltip_hidden_menu')}`}
            buttonText={`${t('btn_do_not_show_again')}`}
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
            {t('logout')}
          </Button>
        </div>
        <DefaultHeaderMoreTab tabs={filteredTabs} />
        {!isCenterPage && hasUnreadNotice && (
            <Balloon
              direction="top"
              className="top-[70px] right-[12px] md:right-[45px] w-[270px]"
              message={`📢 ${t('banner_recent_notice')}`}
              onClose={() => setHasUnreadNotice(false)}
            />
          )}
      </div>
      <div className="absolute bottom-0 left-4 right-4 md:left-12 md:right-12 h-px bg-gray-300 dark:bg-gray-800"></div>
    </header>
  );
}
