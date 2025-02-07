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
} from "../ui/sidebar";
import {
  Home,
  Building2,
  BookAudio,
  Smartphone,
  SquareUserIcon,
  LogOutIcon,
  GalleryVerticalEnd,
} from "lucide-react";

const dashboard = [
  {
    title: "대시보드",
    url: "/",
    icon: Home,
  },
  {
    title: "사용자 관리",
    url: "/user",
    icon: SquareUserIcon,
  },
  {
    title: "코치 관리",
    url: "/coach",
    icon: Building2,
  },
  {
    title: "기기 관리",
    url: "/device",
    icon: BookAudio,
  },
  {
    title: "환경 설정",
    url: "/setting",
    icon: Smartphone,
  },
];

export default function DefaultSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold">Tangoplus</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>DASHBOARD</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboard.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="lg:!w-5 lg:!h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div>
                <LogOutIcon className="lg:!w-5 lg:!h-5" />
                <p>로그아웃</p>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
