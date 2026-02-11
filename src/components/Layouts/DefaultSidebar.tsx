"use client";

import React from "react";
import { flushSync } from "react-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, SidebarHeader, useSidebar } from "../ui/sidebar";
import Link from "next/link";
import { Button } from "../ui/button";
import { useLogout } from "@/hooks/api/auth/useLogout";
import { useAuthStore } from "@/providers/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

const dashboard = [
  {
    title: "대시보드",
    url: "/",
    icon: "/icons/ic_dashboard.svg",
  },
  {
    title: "센터 측정 현황",
    url: "/measure",
    icon: "/icons/ic_measure.svg",
  },
  {
    title: "사용자 회원 관리",
    url: "/user",
    icon: "/icons/ic_users.svg",
  },
  // {
  //   title: "코치 관리",
  //   url: "/coach",
  //   icon: Building2,
  // },
  {
    title: "기기 관리",
    url: "/device",
    icon: "/icons/ic_device.svg",
  },
  {
    title: "매니저 관리",
    url: "/manager",
    icon: "/icons/ic_manager.svg",
  },
  {
    title: "로그인 기록 관리",
    url: "https://gym.tangoplus.co.kr/admin_api/login_page.php",
    icon: "/icons/ic_paper.svg",
    external: true,
  },
  {
    title: "설정",
    url: "/setting",
    icon: "/icons/ic_settings.svg",
  },
];

export default function DefaultSidebar() {
  const logoutMutation = useLogout();
  const { adminRole } = useAuthStore((state) => state);
  const pathname = usePathname();
  const [indicatorStyle, setIndicatorStyle] = React.useState({ top: 0, height: 0 });
  const menuItemRefs = React.useRef<(HTMLLIElement | null)[]>([]);
  const { state, openMobile, setOpenMobile } = useSidebar();
  const isMobile = useIsMobile();
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // 필터링된 대시보드 (기기 관리, 로그인 기록 관리, 매니저 관리 = 주관리자(1)만 표시)
  const filteredDashboard = React.useMemo(() => {
    return dashboard.filter((item) => {
      if (
        item.title === "기기 관리" ||
        item.title === "로그인 기록 관리" ||
        item.title === "매니저 관리"
      ) {
        return adminRole === 1;
      }
      if (adminRole === 2) {
        return true;
      }
      if (adminRole >= 3) {
        return !["대시보드", "사용자 히스토리 관리", "센터 측정 현황"].includes(item.title);
      }
      return true;
    });
  }, [adminRole]);

  React.useEffect(() => {
    const activeIndex = filteredDashboard.findIndex((item) => {
      // url이 "/"인 경우는 정확히 pathname도 "/"일 때만 매칭
      if (item.url === "/") {
        return pathname === "/";
      }
      // 다른 url들은 startsWith로 매칭
      return pathname.startsWith(item.url);
    });

    // 모바일에서 사이드바가 열려있을 때만 인디케이터 위치 계산
    if (activeIndex >= 0 && menuItemRefs.current[activeIndex] && (openMobile || !isMobile)) {
      // 약간의 지연을 주어 Sheet가 완전히 렌더링된 후 위치 계산
      const timer = setTimeout(() => {
        const element = menuItemRefs.current[activeIndex];
        if (element) {
          const rect = element.getBoundingClientRect();
          const parentRect = element.offsetParent?.getBoundingClientRect();

          setIndicatorStyle({
            top: rect.top - (parentRect?.top || 0),
            height: rect.height,
          });
        }
      }, openMobile ? 100 : 50); // 모바일일 때는 더 긴 지연

      return () => clearTimeout(timer);
    } else if (activeIndex >= 0) {
      // activeIndex는 있지만 조건이 맞지 않을 때는 기본값 유지
      setIndicatorStyle({ top: 0, height: 0 });
    }
  }, [pathname, adminRole, openMobile, isMobile, filteredDashboard, state]);

  const handleLinkClick = () => {
    if (isMobile) {
      // 네비게이션 전에 즉시 Sheet 닫기 (동기 처리)
      flushSync(() => setOpenMobile(false));
    }
  };

  // 모바일: 경로가 바뀌면 사이드바 팝업(Sheet) 닫기 (메뉴 탭 클릭 후 확실히 닫히도록)
  React.useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [pathname, isMobile, setOpenMobile]);

  const router = useRouter();
  const handleLogoClick = () => {
    router.push('/');
    // 모바일에서 로고 클릭 시 사이드바 닫기
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar collapsible="icon" className="bg-[#F1F5F9] dark:bg-black">
      <SidebarHeader className="bg-toggleAccent-background h-20 !flex !flex-row !items-center !p-0 px-2">
        <div className="flex items-center w-full">
          {/* 👇 앱로고와 텍스트는 SidebarMenuButton 안에 - 접히면 사라짐 */}
          <SidebarMenuButton 
          size="lg" 
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex-1 !h-full !flex !items-center !justify-center"
          onClick={handleLogoClick}
          >
            <div
              className={`flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground transition-all duration-300 ease-in-out ${
                isMobile && !openMobile ? "opacity-0 scale-0" : "opacity-100 scale-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/app_logo.svg" alt="logout" className="lg:!w-6 lg:!h-6" />
            </div>
            <div
              className={`flex flex-col gap-0.5 leading-none transition-all duration-300 ease-in-out overflow-hidden ${
                isMobile && !openMobile ? "opacity-0 -translate-x-2 scale-95" : "opacity-100 translate-x-0 scale-100"
              }`}
            >
              <span className="font-semibold text-xl whitespace-nowrap">탱고바디</span>
            </div>
          </SidebarMenuButton>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-toggleAccent-background !overflow-hidden">
        <SidebarGroup>
          {/* <SidebarGroupLabel>DASHBOARD</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className="gap-4">
              <div
                className={`absolute left-0 transition-all duration-300 ease-in-out ${
                  state === "collapsed" && !openMobile && !isMobile
                    ? "w-8 h-8 rounded-full left-1/2 -translate-x-1/2" // 👈 접혔을 때: 원형 + 중앙 (데스크톱만)
                    : "w-full bg-[#4169E1] rounded-l-[20px] rounded-r-none ml-4 " // 👈 펼쳤을 때 (데스크톱 expanded 또는 모바일 openMobile)
                }`}
                style={{
                  top:
                    state === "collapsed" && !openMobile && !isMobile
                      ? `${indicatorStyle.top + indicatorStyle.height / 2 - 16}px`
                      : `${indicatorStyle.top - 8}px`, // 👈 펼쳐졌을 때 (데스크톱 expanded 또는 모바일 openMobile)
                  height: state === "collapsed" && !openMobile && !isMobile ? "32px" : `${indicatorStyle.height + 16}px`,
                  opacity: indicatorStyle.height > 0 && (openMobile || !isMobile) ? 1 : 0,
                  backgroundColor: "#4169E1",
                }}
              />
              {filteredDashboard.map((item, index) => {
                  const isActive = item.url === "/" ? pathname === item.url : pathname.startsWith(item.url);
                  // TODO 여기서 하단 스크롤만 없애고 넣기
                  return (
                    <SidebarMenuItem
                      key={item.title}
                      className="relative"
                      ref={(el) => {
                        menuItemRefs.current[index] = el;
                      }}
                    >
                      <SidebarMenuButton asChild isActive={isActive}>
                        <div
                          className={`flex items-center gap-3 py-3 px-4 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center ${isActive ? "bg-transparent" : ""}`}
                          onClick={handleLinkClick}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              handleLinkClick();
                            }
                          }}
                          role="presentation"
                        >
                          <Link
                            href={item.url}
                            className="flex items-center gap-3 w-full"
                            {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.icon} alt={item.title} className={`lg:!w-5 lg:!h-5 ml-4 transition-all duration-300 ${isActive ? "brightness-0 invert" : ""}`} />
                            <span className={`transition-colors duration-300 ${isActive ? "text-white" : ""}`}>{item.title}</span>
                          </Link>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-toggleAccent-background">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button type="button" onClick={handleLogout} variant="ghost" className="inline-flex justify-start w-full ml-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/ic_logout.svg" alt="logout" className="lg:!w-5 lg:!h-5" />
                <p>로그아웃</p>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
