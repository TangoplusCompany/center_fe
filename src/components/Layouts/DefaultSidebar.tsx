"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "../ui/sidebar";
import {
  Home,
  Smartphone,
  SquareUserIcon,
  LogOutIcon,
  GalleryVerticalEnd,
  Network,
  Settings,
  SquareActivity,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useLogout } from "@/hooks/api/auth/useLogout";

const dashboard = [
  {
    title: "대시보드",
    url: "/",
    icon: Home,
  },
  {
    title: "측정 관리",
    url: "/measure",
    icon: SquareActivity,
  },
  {
    title: "사용자 관리",
    url: "/user",
    icon: SquareUserIcon,
  },
  // {
  //   title: "코치 관리",
  //   url: "/coach",
  //   icon: Building2,
  // },
  {
    title: "기기 관리",
    url: "/device",
    icon: Smartphone,
  },
  {
    title: "매니저 관리",
    url: "/manager",
    icon: Network,
  },
  {
    title: "설정",
    url: "/setting",
    icon: Settings,
  },
];

export default function DefaultSidebar() {
  const logoutMutation = useLogout();
  const { isMobile, setOpenMobile } = useSidebar(); // Sidebar 상태 접근

  const handleLogout = () => {
    logoutMutation.mutate();
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="bg-white dark:bg-black">
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold text-xl">탱고플러스 센터</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="bg-white dark:bg-black">
        <SidebarGroup>
          <SidebarGroupLabel>DASHBOARD</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboard.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} onClick={handleLinkClick}>
                      <item.icon className="lg:!w-5 lg:!h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-white dark:bg-black">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button
                type="button"
                onClick={handleLogout}
                variant="ghost"
                className="inline-flex justify-start w-full"
              >
                <LogOutIcon className="lg:!w-5 lg:!h-5" />
                <p>로그아웃</p>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
