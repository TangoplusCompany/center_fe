"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

interface IMenu {
  title: string;
  url: string;
  initial: string;
}

const Menus: IMenu[] = [
  {
    title: "대시보드",
    url: "/",
    initial: "",
  },
  {
    title: "측정 관리",
    url: "/measure",
    initial: "measure",
  },
  {
    title: "사용자 관리",
    url: "/user",
    initial: "user",
  },
  {
    title: "코치 관리",
    url: "/coach",
    initial: "coach",
  },
  {
    title: "기기 관리",
    url: "/device",
    initial: "device",
  },
  {
    title: "설정",
    url: "/setting",
    initial: "setting",
  },
];

export function LayoutBreadCrumb() {
  const pathName = usePathname();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">탱고플러스 센터</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              {pathName === "/" ? (
                <p className="text-slate-950 dark:text-foreground">대시보드</p>
              ) : (
                <p className="text-slate-950 dark:text-foreground">
                  {Menus.filter((el) => el.url !== "/").find((menu) => pathName.includes(menu.url))
                    ?.title || "Not Found"}
                </p>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {Menus.map((menu, index) => (
                <DropdownMenuItem key={menu.title + menu.initial + index}>
                  <BreadcrumbLink href={menu.url}>{menu.title}</BreadcrumbLink>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
